package fr.genin.christophe.artisans.server.number;

import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.util.Optional;

/**
 * Doubles Utils.
 */
public final class Doubles {
    private static final Logger logger = LoggerFactory.getLogger(Doubles.class);

    private Doubles() {
    }

    public static Double rad2deg(Double rad) {
        return rad * 180.0 / Math.PI;
    }

    public static Double deg2rad(Double deg) {

        return deg * Math.PI / 180.0;
    }

    public static Double toDouble(String s) {
        try {
            return Optional.ofNullable(s)
                    .filter(st -> !st.isEmpty())
                    .map(Double::valueOf)
                    .orElse(0.0);
        } catch (NumberFormatException nfe) {
            logger.warn("convert error ", nfe);
            return 0.0;
        }
    }
}
