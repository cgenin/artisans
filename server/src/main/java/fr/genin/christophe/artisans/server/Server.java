package fr.genin.christophe.artisans.server;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

/**
 * Launch Verticles.
 */
public class Server extends AbstractVerticle {

    private static final Logger logger = LoggerFactory.getLogger(Main.class);

    @Override
    public void start() throws Exception {
        logger.info("launching server ...");
        vertx.deployVerticle(new Http());
        vertx.deployVerticle(new Artisans());

    }

}
