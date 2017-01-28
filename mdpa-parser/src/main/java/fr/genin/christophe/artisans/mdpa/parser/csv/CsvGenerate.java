package fr.genin.christophe.artisans.mdpa.parser.csv;

import fr.genin.christophe.artisans.mdpa.parser.redis.RedisContainer;
import fr.genin.christophe.artisans.mdpa.parser.redis.RedisCst;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * Main.
 */
public class CsvGenerate {
    private static final Logger logger = LoggerFactory.getLogger(CsvGenerate.class);

    public static void main(String[] args) {
        RedisContainer.builder(RedisCst.URL).sync(
                commands -> {
                    final List<String> keys = commands.keys("artisan:*");

                    final Path path = Paths.get("garages.csv");

                    try (final BufferedWriter bw = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {
                        bw.write("id,adress\n");
                        keys.forEach(k -> {
                            try {
                                final String s = commands.get(k);
                                final JsonObject json = new JsonObject(s);
                                final String adress = json.getString("adress");

                                bw.write(k + "," + adress + "\n");
                            } catch (IOException e) {
                                logger.error("write error", e);
                            }
                        });
                        bw.flush();
                    }
                }
        );
    }
}
