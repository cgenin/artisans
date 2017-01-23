package fr.genin.christophe.artisans.mdpa.parser;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.io.BufferedWriter;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Main Class
 */
public class Main {


    private static final Logger logger = LoggerFactory.getLogger(Main.class);


    public static void main(String[] args) throws Exception {
        final List<String> departements = Departements.get();
        final List<JsonObject> garages = Arrays.stream(Voiture.values()).map(
                v -> {
                    final String name = v.name();
                    logger.info("******************* " +
                            name + " ****************************");
                    return v.getJson().copy().put("values", new Parser.Builder(name).departments(departements).build().json());
                }
        ).collect(Collectors.toList());
        logger.info("write the file ....");
        final Path path = Paths.get("datas.json");
        try (BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {
            writer.write(new JsonArray(garages).encode());
            writer.flush();
        }
        logger.info("end.");

    }
}
