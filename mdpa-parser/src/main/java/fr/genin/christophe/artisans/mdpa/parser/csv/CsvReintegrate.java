package fr.genin.christophe.artisans.mdpa.parser.csv;

import fr.genin.christophe.artisans.mdpa.parser.redis.RedisContainer;
import fr.genin.christophe.artisans.mdpa.parser.redis.RedisCst;
import io.vertx.core.json.JsonObject;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

/**
 * .
 */
public class CsvReintegrate {

    public static void main(String[] args) {
        RedisContainer.builder(RedisCst.URL).sync(
                commands -> {
                    final List<String> strings = Files.readAllLines(Paths.get("garages.geocoded.csv"));
                    strings
                            .subList(1, strings.size())
                            .stream()
                            .map(line -> line.split(","))
                            .filter(split -> split != null && split.length > 5 && split[2] != null && !split[2].isEmpty())
                            .forEach(
                                    split -> {

                                        final String key = split[0];
                                        final String lat = split[2];
                                        final String lon = split[3];
                                        final String label = split[4];
                                        final JsonObject coords = new JsonObject().put("lat", lat).put("lon", lon).put("label", label);
                                        final String value = commands.get(key);
                                        final JsonObject json = new JsonObject(value).copy().put("coords", coords);
                                        commands.set(key, json.encode());
                                    }
                            );
                    commands.bgsave();
                }
        );
    }
}
