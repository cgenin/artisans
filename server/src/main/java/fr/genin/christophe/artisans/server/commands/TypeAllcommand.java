package fr.genin.christophe.artisans.server.commands;

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
import java.util.List;

/**
 * get all type of artisans
 */
public class TypeAllcommand {


    private final RedisClient redis;

    public TypeAllcommand(RedisClient redis) {
        this.redis = redis;
    }


    public void execute(Action1<Throwable> onError, Action1<JsonArray> onComplet) {
        final ArrayList<JsonObject> results = new ArrayList<>();
        Observable.just("typeArtisanKey:*")
                .flatMap(requestKey())
                .flatMap(loadKeys())
                .subscribeOn(Schedulers.io())
                .subscribe(results::add,
                        onError, () -> onComplet.call(new JsonArray(results)));
    }

    private Func1<List<String>, Observable<JsonObject>> loadKeys() {
        return list -> {
            final ObservableFuture<JsonArray> obs = RxHelper.observableFuture();
            redis.mgetMany(list, obs.toHandler());
            return obs.flatMap(arr -> Observable.from(arr.getList()))
                    .map(o->new JsonObject(o.toString()));
        };
    }

    private Func1<String, Observable<List<String>>> requestKey() {
        return k -> {
            final ObservableFuture<JsonArray> obs = RxHelper.observableFuture();
            redis.keys(k, obs.toHandler());
            return obs.map(JsonArray::getList);
        };
    }
}
