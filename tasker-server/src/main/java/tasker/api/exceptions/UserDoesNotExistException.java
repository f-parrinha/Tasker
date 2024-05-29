package tasker.api.exceptions;

public class UserDoesNotExistException extends Exception {
    public UserDoesNotExistException() {
        super("No User with the given username was found");
    }
}
