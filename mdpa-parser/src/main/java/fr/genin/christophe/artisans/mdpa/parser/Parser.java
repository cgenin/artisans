package fr.genin.christophe.artisans.mdpa.parser;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * .
 */
public class Parser {

    private static final Logger logger = LoggerFactory.getLogger(Parser.class);
    public final List<JsonObject> list;


    private Parser(List<JsonObject> list) {
        this.list = list;
    }

    public JsonArray json() {
        return new JsonArray(list);
    }

    public static class Builder {

        private final String type;
        private List<String> deps;

        public Builder(String type) {
            this.type = type;
        }

        public Builder departments(List<String> deps) {
            this.deps = deps;
            return this;
        }

        public Stream<JsonObject> map(String dep) {
            try {
                logger.info("treatement of " + dep);
                final Document document = Jsoup.connect(
                        "http://www.mutpoitiers-services.com/internetServices/jsp/garage.jsp?" +
                                "type=" + this.type +
                                "&prov=voiture&provenance=null&dpt=" + dep)
                        .get();
                final Elements elements = document.select("tr > td.txtSmallNoir:not(:first-child)");

                final int size = elements.size();
                final int chunk = size / 3;

                return IntStream.rangeClosed(0, chunk - 1)
                        .parallel()
                        .mapToObj(i -> {
                                    final int index = i * 3;
                                    return IntStream.range(index, index + 3)
                                            .mapToObj(j -> (j))
                                            .collect(Collectors.toList());
                                }
                        )
                        .map(l -> new JsonObject()
                                .put("name", elements.get(l.get(0)).text())
                                .put("adress", elements.get(l.get(1)).text())
                                .put("contact", elements.get(l.get(2)).text()));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        public Parser build() {
            final List<JsonObject> list = deps.stream().flatMap(this::map).collect(Collectors.toList());
            logger.info("finalization....");
            return new Parser(list);
        }
    }
}
