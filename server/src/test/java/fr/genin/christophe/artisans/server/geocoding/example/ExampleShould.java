package fr.genin.christophe.artisans.server.geocoding.example;

import com.google.common.base.Splitter;
import fr.genin.christophe.artisans.server.geocoding.Depts;
import fr.genin.christophe.artisans.server.geocoding.GeoCod;
import fr.genin.christophe.artisans.server.geocoding.Point;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * .
 */
public class ExampleShould {

    public static Double parse(String s) {
        try {
            return Double.valueOf(s);
        } catch (NumberFormatException nbe) {
            return null;
        }
    }

    @Test
    public void filter_commune() throws IOException, URISyntaxException {
        final List<Commune> communes = getCommunes();
        final long l1 = System.currentTimeMillis();

        final List<Commune> filtered = communes.stream().filter(Depts.limitroph("86").predicate(input -> input.getCodes_postaux())).collect(Collectors.toList());
        final List<Commune> sorting = GeoCod
                .<Commune>sorter(46.246992, 0.832142)
                .sort(filtered, (c) -> Point.builder(c).lat(c.getLatitude()).lon(c.getLongitude()).build());

        final long time = System.currentTimeMillis() - l1;

        assertThat(sorting.stream().limit(5).map(Commune::getCodes_postaux)
                .collect(Collectors.toList())).startsWith("86430", "87320", "86430", "87330", "87330");
        assertThat(sorting.stream().limit(5).map(Commune::getName).map(String::toUpperCase)
                .collect(Collectors.toList())).contains("ADRIERS", "BUSSIÈRE-POITEVINE", "MOUTERRE-SUR-BLOURDE", "SAINT-MARTIAL-SUR-ISOP", "SAINT-BARBANT");
        System.out.println("Duration : " + time);
        System.out.println("Number : " + filtered.size());
        final BigDecimal average = BigDecimals.of(time).divide(BigDecimals.of(communes.size()), 15, BigDecimal.ROUND_HALF_EVEN);
        System.out.println("Average : " + average);
    }

    @Test
    public void for_all_communes() throws IOException, URISyntaxException {

        final List<Commune> communes = getCommunes();
        final long l1 = System.currentTimeMillis();
        final List<Commune> sorting = GeoCod
                //.<Commune>sorter(46.348164, -0.387781)
                .<Commune>sorter(46.246992, 0.832142)
                .sort(communes, (c) -> Point.builder(c).lat(c.getLatitude()).lon(c.getLongitude()).build());
        final long time = System.currentTimeMillis() - l1;


        assertThat(sorting.stream().limit(5).map(Commune::getCodes_postaux)
                .collect(Collectors.toList())).startsWith("86430", "87320", "86430", "87330", "87330");
        assertThat(sorting.stream().limit(5).map(Commune::getName).map(String::toUpperCase)
                .collect(Collectors.toList())).contains("ADRIERS", "BUSSIÈRE-POITEVINE", "MOUTERRE-SUR-BLOURDE", "SAINT-MARTIAL-SUR-ISOP", "SAINT-BARBANT");
        System.out.println("Duration : " + time);
        System.out.println("Number : " + communes.size());
        final BigDecimal average = BigDecimals.of(time).divide(BigDecimals.of(communes.size()), 15, BigDecimal.ROUND_HALF_EVEN);
        System.out.println("Average : " + average);

    }

    private List<Commune> getCommunes() throws IOException, URISyntaxException {
        final URL resource = ExampleShould.class.getResource("/eucircos_regions_departements_circonscriptions_communes_gps.csv");
        final Splitter splitter = Splitter.on(';');
        return Files.readAllLines(new File(resource.toURI()).toPath()).stream().map((s) -> {
            final List<String> strings = splitter.splitToList(s);
            final Commune commune = new Commune();
            commune.setName(strings.get(8));
            commune.setLatitude(parse(strings.get(11)));
            commune.setLongitude(parse(strings.get(12)));
            commune.setCodes_postaux(strings.get(9));
            return commune;
        }).collect(Collectors.toList());
    }
}
