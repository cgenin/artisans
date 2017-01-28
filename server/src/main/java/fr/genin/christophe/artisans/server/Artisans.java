package fr.genin.christophe.artisans.server;

import fr.genin.christophe.artisans.server.geocoding.Depts;
import fr.genin.christophe.artisans.server.geocoding.GeoCod;
import fr.genin.christophe.artisans.server.geocoding.Point;
import fr.genin.christophe.artisans.server.number.Doubles;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.redis.RedisClient;
import io.vertx.redis.RedisOptions;
import io.vertx.rx.java.ObservableFuture;
import io.vertx.rx.java.RxHelper;
import rx.Observable;
import rx.schedulers.Schedulers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Artisans search.
 */
public class Artisans extends AbstractVerticle {


    private static final Logger logger = LoggerFactory.getLogger(Artisans.class);
    public static final String TYPE_ARTISANS = Artisans.class.getName() + ".type.values";
    public static final String ARTISANS_NEAR = Artisans.class.getName() + ".near";


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
                        return;
                    }
                    final List<String> r = mres.result().getList();
                    final List<JsonObject> l = r.stream()
                            .map(JsonObject::new)
                            .collect(Collectors.toList());
                    msg.reply(new JsonArray(l));
                });

            });
        });

        vertx.eventBus().<JsonObject>consumer(ARTISANS_NEAR, msg -> {
            final Double lat = msg.body().getDouble("lat");
            final Double lon = msg.body().getDouble("lon");
            final String dept = msg.body().getString("dept");
            final String type = msg.body().getString("type");
            // Keys request by dep and type
            final Observable<String> keysObervable = Observable.from(Depts.limitroph(dept).list())
                    .flatMap(
                            d -> {
                                final ObservableFuture<JsonArray> obs = RxHelper.<JsonArray>observableFuture();
                                redis.lrange("dep:" + dept + ":" + type, -1000, 1000, obs.toHandler());
                                return obs.asObservable().flatMapIterable(arr -> arr.stream().map(Object::toString)
                                        .collect(Collectors.toList()));
                            }
                    );
            // get valuies by key
            final Observable<JsonObject> objsObservable = keysObervable.flatMap(k -> {
                final ObservableFuture<String> objs = RxHelper.observableFuture();
                redis.get(k, objs.toHandler());
                return objs.map(JsonObject::new);
            });
            // create results and sort by distance
            final List<JsonObject> listres = Collections.synchronizedList(new ArrayList<>());
            objsObservable.observeOn(Schedulers.io()).subscribe(listres::add,
                    e -> {
                        logger.error("Error in retreiving key");
                        msg.fail(500, "error");
                    },
                    () -> {
                        final List<Point<Object>> list = listres.parallelStream().map(o -> Point.builder(o)
                                .lat(Doubles.toDouble(o.getJsonObject("coords", new JsonObject()).getString("lat")))
                                .lon(Doubles.toDouble(o.getJsonObject("coords", new JsonObject()).getString("lon")))
                                .build()).collect(Collectors.toList());
                        final List<JsonObject> results = GeoCod.sorter(lat, lon)
                                .sortPoints(list).stream()
                                .map(pt -> {
                                    final JsonObject json = (JsonObject) pt.getData();
                                    return pt.getDistance()
                                            .map(d -> json.copy().put("distance", d.kilometer()))
                                            .orElse(json);
                                }).collect(Collectors.toList()
                                );

                        msg.reply(new JsonObject()
                                .put("reference", new JsonObject().put("dept", dept).put("lat", lat).put("lon", lon))
                                .put("length", results.size())
                                .put("results", new JsonArray(results))
                        );
                    });

        });
    }
}
