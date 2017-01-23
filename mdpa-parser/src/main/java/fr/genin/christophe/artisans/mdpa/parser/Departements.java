package fr.genin.christophe.artisans.mdpa.parser;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Created by skarb on 23/01/2017.
 */
public final class Departements {

    public static List<String> get() {
        return IntStream.range(1, 96)
                .mapToObj(i -> String.format("%02d", i))
                .collect(Collectors.toList());
    }

    private Departements() {
    }
}
