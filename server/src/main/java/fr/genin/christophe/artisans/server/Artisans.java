package fr.genin.christophe.artisans.server;

import fr.genin.christophe.artisans.server.commands.SearchCommands;
import fr.genin.christophe.artisans.server.commands.AllTypescommand;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.redis.RedisClient;
import io.vertx.redis.RedisOptions;

/**
 * Artisans search.
 */
public class Artisans extends AbstractVerticle {


    private static final Logger logger = LoggerFactory.getLogger(Artisans.class);
    static final String TYPE_ARTISANS = Artisans.class.getName() + ".type.values";
    static final String ARTISANS_NEAR = Artisans.class.getName() + ".near";


    @SuppressWarnings("unchecked")
    @Override
    public void start() throws Exception {
        RedisOptions config = new RedisOptions()
                .setHost("127.0.0.1");
        RedisClient redis = RedisClient.create(vertx, config);
        logger.info("Redis client connected");

        vertx.eventBus().consumer(TYPE_ARTISANS, msg ->
                new AllTypescommand(redis).execute(
                        err -> {
                            logger.error("TYPE_ARTISANS", err);
                            msg.reply(new JsonArray());
                        },
                        msg::reply
                )
        );

        vertx.eventBus().<JsonObject>consumer(ARTISANS_NEAR, msg -> {
            final Double lat = msg.body().getDouble("lat");
            final Double lon = msg.body().getDouble("lon");
            final String dept = msg.body().getString("dept");
            final String type = msg.body().getString("type");

            new SearchCommands(redis, lat, lon, dept, type)
                    .execute(
                            e -> {
                                logger.error("Error in retreiving key",e);
                                msg.fail(500, "error");
                            },
                            (results) -> msg.reply(new JsonObject()
                                    .put("reference", new JsonObject().put("dept", dept).put("lat", lat).put("lon", lon))
                                    .put("length", results.size())
                                    .put("results", new JsonArray(results))
                            )
                    );

        });
    }
}
