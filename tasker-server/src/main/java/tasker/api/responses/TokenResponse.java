package tasker.api.responses;

public class TokenResponse extends ApiResponse {
    private final String token;

    public TokenResponse(String message, String token) {
        super(message);
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
