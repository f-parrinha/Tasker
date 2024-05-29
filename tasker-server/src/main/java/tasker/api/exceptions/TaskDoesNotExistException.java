package tasker.api.exceptions;

public class TaskDoesNotExistException extends Exception {
    public TaskDoesNotExistException() {
        super("The given task does not exist");
    }
}
