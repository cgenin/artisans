package fr.genin.christophe.artisans.server;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

/**
 * Http request manager
 */
public class Http extends AbstractVerticle {

    private static final Logger logger = LoggerFactory.getLogger(Http.class);
    public static final String ADDRESS = "database-service-address";

    @Override
    public void start() throws Exception {
        final int port = config().getInteger("port", 8888);

        final HttpServer httpServer = vertx.createHttpServer(new HttpServerOptions().setCompressionSupported(true));

        final Router router = Router.router(vertx);





        Router restAPI = Router.router(vertx);
        restAPI.get("/").handler(rc -> {
            rc.response().end("test");
        });
        router.mountSubRouter("/api", restAPI);
        router.route("/*")
                .handler(StaticHandler.create("build")
                        .setCachingEnabled(true)
                        .setFilesReadOnly(true)
                );



        httpServer.requestHandler(router::accept).listen(port);
        logger.info("Http server launched !");
    }
}
