package fr.genin.christophe.artisans.mdpa.parser.redis;

import com.lambdaworks.redis.RedisClient;
import com.lambdaworks.redis.api.StatefulRedisConnection;
import com.lambdaworks.redis.api.sync.RedisCommands;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.io.Closeable;
import java.util.Objects;

/**
 * Redis Container.
 */
public class RedisContainer implements Actions.Requester {
    private static final Logger logger = LoggerFactory.getLogger(RedisContainer.class);

    private ClosableConnection connection;


    private RedisContainer(String url) {
        connection = new ClosableConnection(url);
    }

    @Override
    public void sync(Actions.ConsumerWithException cwe) {
        Objects.requireNonNull(cwe);
        try (ClosableConnection conn = connection.build()) {
            final RedisCommands<String, String> syncCommands = conn.connection.sync();
            cwe.apply(syncCommands);
        } catch (Exception ex) {
            logger.error("Error in requesting", ex);
        }
    }



    public static Actions.Requester builder(String url) {
        Objects.requireNonNull(url);
        return new RedisContainer(url);
    }

    public static class ClosableConnection implements Closeable {
        private final String url;
        private StatefulRedisConnection<String, String> connection;
        private RedisClient redisClient;

        ClosableConnection(String url) {
            this.url = url;
        }

        ClosableConnection build() {
            redisClient = RedisClient.create(url);
            connection = redisClient.connect();
            return this;
        }

        @Override
        public void close() {
            connection.close();
            redisClient.shutdown();
        }
    }
}
