package tasker.api.exceptions;

public class NewPasswordIsToShortException extends Exception {
    public NewPasswordIsToShortException(int minChars) {
        super(String.format("The password used is too short. '%d' characters is the minimum amount", minChars));
    }
}
