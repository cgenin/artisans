package fr.genin.christophe.artisans.mdpa.parser.parser;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;
/**
 * test class of {@link Parser}.
 */
public class ParserShould {

    @Test
    public void parse_contact_string() {
        assertThat(Parser.parseContact("Tel: 0474452789 Fax: 0474451518").getMap())
                .containsKeys("tel", "fax")
                .containsEntry("tel","0474452789")
                .containsEntry("fax","0474451518");
        assertThat(Parser.parseContact(null).getMap()).hasSize(0);
        assertThat(Parser.parseContact("").getMap()).hasSize(0);
    }
}
