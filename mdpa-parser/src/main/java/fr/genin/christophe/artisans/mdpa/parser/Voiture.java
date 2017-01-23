package fr.genin.christophe.artisans.mdpa.parser;

import io.vertx.core.json.JsonObject;

import java.util.UUID;

/**
 * Type de voiture.
 */
public enum Voiture {
    VT(new JsonObject().put("name", "Vitreur").put("id", UUID.randomUUID().toString())),
    GA(new JsonObject().put("name", "Garage").put("id", UUID.randomUUID().toString())),
    CT(new JsonObject().put("name", "Contrôle technique").put("id", UUID.randomUUID().toString()));

    private final JsonObject json;

    Voiture(JsonObject json) {
        this.json = json;
    }

    public JsonObject getJson() {
        return json;
    }
}
