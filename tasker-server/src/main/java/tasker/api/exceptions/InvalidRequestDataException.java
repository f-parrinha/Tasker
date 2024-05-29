package tasker.api.exceptions;

public class InvalidRequestDataException extends Exception {
    public InvalidRequestDataException(String request) {
        super(String.format("There was something wrong with the request's '%s' data. Check for null values.", request));
    }
}
