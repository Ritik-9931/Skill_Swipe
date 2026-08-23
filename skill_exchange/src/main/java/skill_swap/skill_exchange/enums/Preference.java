package skill_swap.skill_exchange.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Preference {
    TEACH("Teach"),
    LEARN("Learn");
    
    private final String displayPreference;
    
    Preference(String displayPreference){
        this.displayPreference = displayPreference;
    }

    @JsonValue
    public String getDisplayPreference() {
        return displayPreference;
    }
}
