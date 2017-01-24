package fr.genin.christophe.artisans.server;

import io.vertx.core.Launcher;

/**
 * Main launcher
 */
public class Main extends Launcher {

    public static void main(String[] args) {
        new Main().dispatch(new String[]{"run", Server.class.getName()});
    }
}
