package fr.genin.christophe.artisans.mdpa.parser.redis;

import com.lambdaworks.redis.api.sync.RedisCommands;

/**
 * Interface for {@link RedisContainer}.
 */
public interface Actions {

    @FunctionalInterface
    interface ConsumerWithException {
        void apply(RedisCommands<String, String> rd);
    }

    interface Requester {

        void sync(ConsumerWithException cwe);
    }

}
