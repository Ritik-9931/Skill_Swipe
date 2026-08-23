package skill_swap.skill_exchange.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
    PENDING("Pending"),
    ACCEPTED("Accepted"),
    REJECTED("Rejected"),
    CANCELLED("Cancelled"),
    COMPLETED("Completed");

    private final String displayStatus;

    Status(String displayStatus) {
        this.displayStatus = displayStatus;
    }

    @JsonValue
    public String getDisplayRole() {
        return displayStatus;
    }
}
