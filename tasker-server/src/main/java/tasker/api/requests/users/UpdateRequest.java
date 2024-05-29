package tasker.api.requests.users;

public record UpdateRequest(String username, String password, String email, String firstName, String lastName) {
}
