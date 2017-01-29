package fr.genin.christophe.artisans.server.commands;

import fr.genin.christophe.artisans.server.geocoding.Depts;
import fr.genin.christophe.artisans.server.geocoding.GeoCod;
import fr.genin.christophe.artisans.server.geocoding.Point;
import fr.genin.christophe.artisans.server.number.Doubles;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.redis.RedisClient;
import io.vertx.rx.java.ObservableFuture;
import io.vertx.rx.java.RxHelper;
import rx.Observable;
import rx.functions.Action1;
import rx.functions.Func1;
import rx.schedulers.Schedulers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Search command for artisans.
 */
public class SearchCommands {
    private final RedisClient redis;

    private final Double lat;
    private final Double lon;
    private final String dept;
    private final String type;
    private final List<JsonObject> listres = Collections.synchronizedList(new ArrayList<>());

    public SearchCommands(RedisClient redis, Double lat, Double lon, String dept, String type) {
        this.redis = redis;
        this.lat = lat;
        this.lon = lon;
        this.dept = dept;
        this.type = type;
    }

    /**
     * Keys request by dep and type
     *
     * @return Observable
     */
    private Observable<String> keysObervable() {
        return Observable.from(Depts.limitroph(dept).list())
                .flatMap(
                        d -> {
                            final ObservableFuture<JsonArray> obs = RxHelper.<JsonArray>observableFuture();
                            redis.lrange("dep:" + d + ":" + type, -1000, 1000, obs.toHandler());
                            return obs.asObservable().flatMapIterable(arr -> arr.stream().map(Object::toString)
                                    .collect(Collectors.toList()));
                        }
                );
    }

    /**
     * get valuies by key
     *
     * @return Func transformation
     */
    private Func1<String, Observable<JsonObject>> objsObservable() {
        return k -> {
            final ObservableFuture<String> objs = RxHelper.observableFuture();
            redis.get(k, objs.toHandler());
            return objs.map(JsonObject::new);
        };
    }

    @SuppressWarnings("unchecked")
    public void execute(Action1<Throwable> onError, Action1<List<JsonObject>> onComplet) {
        keysObervable()
                .flatMap(objsObservable())
                .subscribeOn(Schedulers.io())
                .subscribe(listres::add,
                        onError,
                        () -> {
                            final List<Point<Object>> list = listres.parallelStream()
                                    .map(o -> (Point<Object>) Point.<Object>builder(o)
                                            .lat(Doubles.toDouble(o.getJsonObject("coords", new JsonObject()).getString("lat")))
                                            .lon(Doubles.toDouble(o.getJsonObject("coords", new JsonObject()).getString("lon")))
                                            .build()
                                    ).collect(Collectors.toList());
                            final List<JsonObject> results = GeoCod.sorter(lat, lon)
                                    .sortPoints(list).stream()
                                    .map(pt -> {
                                        final JsonObject json = (JsonObject) pt.getData();
                                        return pt.getDistance()
                                                .flatMap(GeoCod.Distance::kilometer)
                                                .map(d -> json.copy().put("distance", d))
                                                .orElse(json);
                                    }).collect(Collectors.toList()
                                    );

                            onComplet.call(results);
                        });
    }
}
