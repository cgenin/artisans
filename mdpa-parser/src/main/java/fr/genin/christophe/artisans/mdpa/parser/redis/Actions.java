package fr.genin.christophe.artisans.mdpa.parser.redis;

import com.lambdaworks.redis.api.sync.RedisCommands;

import java.io.IOException;

/**
 * Interface for {@link RedisContainer}.
 */
public interface Actions {

    @FunctionalInterface
    interface ConsumerWithException {
        void apply(RedisCommands<String, String> rd) throws IOException;
    }

    interface Requester {

        void sync(ConsumerWithException cwe);
    }

}
