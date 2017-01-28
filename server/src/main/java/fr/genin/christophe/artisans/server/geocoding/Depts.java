package fr.genin.christophe.artisans.server.geocoding;

import org.cache2k.Cache;
import org.cache2k.Cache2kBuilder;
import org.cache2k.integration.CacheLoader;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * Departements Utils.
 */
public final class Depts {

    private static LimitrophBuilder builder;

    private static synchronized LimitrophBuilder builder() {
        return Optional.ofNullable(builder).orElseGet(() -> {
            try {
                final Properties properties = new Properties();
                properties.load(Depts.class.getResourceAsStream("/limitroph.properties"));
                builder = new LimitrophBuilder(properties);
                return builder;
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public static Limitroph limitroph(String noDept) {
        Objects.requireNonNull(noDept);
        return new Limitroph(builder(), noDept);
    }

    public static class LimitrophBuilder {

        private final Cache<String, List<String>> cache = new Cache2kBuilder<String, List<String>>() {
        }.name("departement")
                .loader(
                        new CacheLoader<String, List<String>>() {
                            public List<String> load(String dept) {

                                return Optional.ofNullable(dept)
                                        .map(d -> limitroph.getProperty(d, ""))
                                        .filter(property -> !property.isEmpty())
                                        .map(property -> Arrays.stream(property.split(",")).collect(Collectors.toList()))
                                        .orElse(Collections.emptyList());

                            }
                        })
                .build();

        private final Properties limitroph;

        private LimitrophBuilder(Properties limitroph) {
            this.limitroph = limitroph;
        }
    }

    public static class Limitroph {

        private final LimitrophBuilder builder;
        private final String dept;

        public Limitroph(LimitrophBuilder builder, String dept) {
            this.builder = builder;
            this.dept = dept;
        }

        public List<String> list() {
            return builder.cache.get(dept);
        }

        public boolean matchPostalCode(String postalCode) {
            if (postalCode == null) {
                return false;
            }
            return list().stream().anyMatch(postalCode::startsWith);
        }

        public <T> Predicate<T> predicate(Function<T, String> postalCodeFunction) {
            Objects.requireNonNull(postalCodeFunction);
            return (t) -> matchPostalCode(postalCodeFunction.apply(t));
        }
    }
}
