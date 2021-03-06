package fr.genin.christophe.artisans.server;

import fr.genin.christophe.artisans.server.number.Doubles;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Handler;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.StaticHandler;
import rx.Observable;
import rx.schedulers.Schedulers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * Http request manager
 */
public class Http extends AbstractVerticle {

    private static final Logger logger = LoggerFactory.getLogger(Http.class);
    private final String ETAG_INDEX_PAGE = UUID.randomUUID().toString();

    @Override
    public void start() throws Exception {
        final int port = config().getInteger("port", 8888);
        final String host = config().getString("host", "localhost");

        final HttpServer httpServer = vertx.createHttpServer(new HttpServerOptions().setCompressionSupported(true));

        final Router router = Router.router(vertx);


        Router restAPI = Router.router(vertx);
        Router artisanAPI = Router.router(vertx);
        artisanAPI.route().handler(CorsHandler.create("*")
                .allowedMethod(HttpMethod.GET)
//                .allowedMethod(HttpMethod.POST)
                .allowedMethod(HttpMethod.OPTIONS)
                .allowedHeader("Content-Type"));
        Router artisanTypeAPI = Router.router(vertx);
        artisanTypeService(artisanTypeAPI);
        artisanService(artisanAPI);
        artisanAPI.mountSubRouter("/type", artisanTypeAPI);
        restAPI.mountSubRouter("/artisan", artisanAPI);
        router.mountSubRouter("/api", restAPI);

        router.route("/home/*").handler(indexTemplateReader());
        router.route("/results/*").handler(indexTemplateReader());
        router.route("/search/*").handler(indexTemplateReader());

        router.route("/*")
                .handler(StaticHandler.create("build")
                        .setCachingEnabled(true)
                        .setFilesReadOnly(true)
                );

        logger.info("port : " + port);
        logger.info("host : " + host);

        httpServer.requestHandler(router::accept)
                .listen(port, host);
        logger.info("Http server launched !");
    }

    private Handler<RoutingContext> indexTemplateReader() {
        return rc ->
                Observable.fromCallable(
                        () -> Http.class.getClassLoader().getResourceAsStream("build/index.html")
                )
                        .map(
                                input -> {
                                    try (BufferedReader buffer = new BufferedReader(new InputStreamReader(input))) {
                                        return buffer.lines().collect(Collectors.joining(""));
                                    } catch (IOException e) {
                                        throw new IllegalStateException(e);
                                    }
                                }
                        )
                        .subscribeOn(Schedulers.io())
                        .subscribe(
                                (s) -> rc.response()
                                        .setStatusCode(200)
                                        .putHeader(HttpHeaders.CONTENT_TYPE, "text/html;charset=UTF-8")
                                        .putHeader(HttpHeaders.ETAG, ETAG_INDEX_PAGE)
                                        .end(s),
                                (e) -> {
                                    logger.error("Error in getting html page", e);
                                    rc.response()
                                            .setStatusCode(500)
                                            .end();
                                }
                        );
    }


    private void artisanService(Router artisanAPI) {
        artisanAPI.get("/near").handler(rc -> {
            final Double lat = Doubles.toDouble(rc.request().params().get("lat"));
            final Double lon = Doubles.toDouble(rc.request().params().get("lon"));
            final String type = Optional.ofNullable(rc.request().params().get("type")).orElse("");
            final String dept = Optional.ofNullable(rc.request().params().get("dept")).orElse("");

            if (lat.equals(0.0) || lon.equals(0.0) || type.isEmpty() || dept.isEmpty()) {
                rc.response().setStatusCode(400).end();
                return;
            }
            final JsonObject params = new JsonObject().put("dept", dept).put("lat", lat).put("lon", lon).put("type", type);
            vertx.eventBus().<JsonObject>send(Artisans.ARTISANS_NEAR, params,
                    msg -> {
                        if (msg.failed()) {
                            rc.response().setStatusCode(500).end();
                            return;
                        }
                        final String encode = msg.result().body().encode();
                        rc.response()
                                .putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                                .putHeader(HttpHeaders.ETAG, "" + encode.hashCode())
                                .end(encode);
                    }
            );

        });
    }


    private void getAllTypes(Consumer<JsonArray> consumer) {
        vertx.eventBus().<JsonArray>send(Artisans.TYPE_ARTISANS, new JsonObject(), msg -> {
            final JsonArray body = msg.result().body();
            consumer.accept(body);
        });
    }

    private void artisanTypeService(Router artisanTypeAPI) {

        artisanTypeAPI.get("/values").handler(rc -> getAllTypes(
                body -> {
                    final List<JsonObject> list = body.stream()
                            .map(o -> (JsonObject) o)
                            .collect(Collectors.toList());
                    final String q = rc.request().params().get("q");
                    final List<JsonObject> filtered = Optional.ofNullable(q)
                            .map(String::toUpperCase)
                            .map(s -> list.stream().parallel()
                                    .filter(
                                            json -> json.getJsonArray("values").stream().parallel()
                                                    .map(Object::toString)
                                                    .map(String::toUpperCase)
                                                    .anyMatch(s::contains)
                                    )
                                    .collect(Collectors.toList()))
                            .orElse(Collections.emptyList());
                    final int size = filtered.size();
                    final String data = new JsonObject().put("size", size)
                            .put("results", (size == 0) ? list : filtered)
                            .encode();
                    rc.response()
                            .putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                            .putHeader(HttpHeaders.ETAG, "" + data.hashCode())
                            .end(data);
                }));

        artisanTypeAPI.get("/").handler(rc -> getAllTypes(body -> {
            final String encode = body.encode();
            rc.response()
                    .putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                    .putHeader(HttpHeaders.ETAG, "" + encode.hashCode())
                    .end(encode);
        }));
    }
}
