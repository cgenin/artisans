package fr.genin.christophe.artisans.server;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * Http request manager
 */
public class Http extends AbstractVerticle {

    private static final Logger logger = LoggerFactory.getLogger(Http.class);

    @Override
    public void start() throws Exception {
        final int port = config().getInteger("port", 8888);

        final HttpServer httpServer = vertx.createHttpServer(new HttpServerOptions().setCompressionSupported(true));

        final Router router = Router.router(vertx);


        Router restAPI = Router.router(vertx);
        Router artisanAPI = Router.router(vertx);
        Router artisanTypeAPI = Router.router(vertx);
        artisanTypeService(artisanTypeAPI);
        artisanAPI.mountSubRouter("/type", artisanTypeAPI);
        restAPI.mountSubRouter("/artisan", artisanAPI);
        router.mountSubRouter("/api", restAPI);
        router.route("/*")
                .handler(StaticHandler.create("build")
                        .setCachingEnabled(true)
                        .setFilesReadOnly(true)
                );


        httpServer.requestHandler(router::accept).listen(port);
        logger.info("Http server launched !");
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
