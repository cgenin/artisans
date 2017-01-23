package fr.genin.christophe.artisans.mdpa.parser;

import org.junit.Test;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.regex.Pattern;

/**
 * Test of {@link Departements}
 */
public class DepartementsShould {

    private Pattern pattern = Pattern.compile("[0-9]{2}");

    @Test
    public void get_return_results() {
        final List<String> strings = Departements.get();
        assertThat(strings)
                .hasSize(95)
                .isSorted()
                .doesNotContainNull()
                .allMatch(s -> pattern.matcher(s).matches());

    }
}
