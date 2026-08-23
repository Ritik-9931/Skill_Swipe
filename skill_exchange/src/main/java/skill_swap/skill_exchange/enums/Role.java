package skill_swap.skill_exchange.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    ADMIN("Admin"),
    USER("User");

    private final String displayRole;

    Role(String displayRole) {
        this.displayRole = displayRole;
    }

    @JsonValue
    public String getDisplayRole() {
        return displayRole;
    }
}
