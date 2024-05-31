package tasker.api.exceptions;

public class InvalidEmailException extends Exception {
    public InvalidEmailException() {
        super("The provided email is not a real email address");
    }
}
