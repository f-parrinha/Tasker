package tasker.api.responses;

import tasker.api.models.DataModel;

public class ApiResponse {
    private final String message;

    public ApiResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
