package fr.genin.christophe.artisans.server;

import com.sun.deploy.panel.JSmartTextArea;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.redis.RedisClient;
import io.vertx.redis.RedisOptions;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Artisans search.
 */
public class Artisans extends AbstractVerticle {


    private static final Logger logger = LoggerFactory.getLogger(Artisans.class);
    public static final String TYPE_ARTISANS = Artisans.class.getName() + ".type.values";

    @SuppressWarnings("unchecked")
    @Override
    public void start() throws Exception {
        RedisOptions config = new RedisOptions()
                .setHost("127.0.0.1");
        RedisClient redis = RedisClient.create(vertx, config);
        logger.info("Redis client connected");

        vertx.eventBus().consumer(TYPE_ARTISANS, msg -> {
            redis.keys("typeArtisanKey:*", a -> {
                if (a.failed()) {
                    logger.error("TYPE_ARTISANS : retreiving keys", a.cause());
                    msg.reply(new JsonArray());
                }
                final List<String> list = a.result().getList();
                redis.mgetMany(list, mres -> {
                    if (mres.failed()) {
                        logger.error("TYPE_ARTISANS : MGET", mres.cause());
                        msg.reply(new JsonArray());
                    }
                    final List<String> r = mres.result().getList();
                    final List<JsonObject> l = r.stream()
                            .map(JsonObject::new)
                            .collect(Collectors.toList());
                    msg.reply(new JsonArray(l));
                });

            });
        });
    }
}
