package fr.genin.christophe.artisans.mdpa.parser;

import fr.genin.christophe.artisans.mdpa.parser.parser.Parser;
import fr.genin.christophe.artisans.mdpa.parser.redis.RedisContainer;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Main Class
 */
public class Main {


    private static final Logger logger = LoggerFactory.getLogger(Main.class);
    public final AtomicLong typeArtisanAtomic = new AtomicLong(0);
    public final AtomicLong artisanAtomic = new AtomicLong(0);

    public String typeArtisanKey() {
        return "typeArtisanKey:" + typeArtisanAtomic.incrementAndGet();
    }

    public String artisanKey() {
        return "artisan:" + artisanAtomic.incrementAndGet();
    }

    public String dep(String dep, String artisanKey) {
        return "dep:" + dep + ":" + artisanKey;
    }

    public static void main(String[] args) throws Exception {

        final Main main = new Main();
        RedisContainer.builder("redis://localhost:6379/0").sync(
                commands -> {
                    final List<String> departements = Departements.get();
                    Arrays.stream(Voiture.values()).forEach(
                            v -> {
                                final String name = v.name();
                                logger.info("******************* " + name + " ****************************");
                                final String typeArtisanKey = main.typeArtisanKey();
                                logger.info("******************* set in redis ****************************");
                                commands.set(typeArtisanKey, v.getJson().encode());
                                logger.info("******************* parse site web ****************************");
                                final Map<String, Set<String>> pushDatas = new Parser.Builder(name)
                                        .departments(departements)
                                        .build()
                                        .list
                                        .stream()
                                        .map(value -> {
                                            final String artisanKey = main.artisanKey();
                                            final JsonObject redis = value.put("redis", artisanKey).put("typeArtisanKey", typeArtisanKey);
                                            commands.set(artisanKey, redis.encode());

                                            return redis;
                                        })
                                        .collect(Collectors
                                                .groupingBy(obj -> obj.getString("dep"),
                                                        Collectors.mapping(obj -> obj.getString("redis"),
                                                                Collectors.toSet()))
                                        );
                                logger.info("******************* push list ****************************");
                                pushDatas.entrySet().forEach(e -> {
                                    final String key = main.dep(e.getKey(), typeArtisanKey);
                                    final String[] objects = e.getValue().toArray(new String[e.getValue().size()]);
                                    commands.lpush(key, objects);
                                });
                            }
                    );
                }
        );


//        logger.info("write the file ....");

//        final Path path = Paths.get(file);
//        try (BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {
//            writer.write(new JsonArray(garages).encode());
//            writer.flush();
//        }
        logger.info("end.");

    }
}
