package tasker.api.exceptions;

public class UserAlreadyExistsException extends Exception {
    public UserAlreadyExistsException(String username) {
        super(String.format("User with username '%s' already exists", username));
    }
}
