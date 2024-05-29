package tasker.api.exceptions;

public class UserNotAuthorizedException extends Exception{
    public UserNotAuthorizedException(String reason) {
        super(String.format("User could not be authorized for the given reason: '%s'", reason));
    }
}
