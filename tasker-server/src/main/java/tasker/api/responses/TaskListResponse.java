package tasker.api.responses;

import tasker.api.models.DataModel;
import tasker.api.resources.Task;

import java.util.List;

public class TaskListResponse extends ApiResponse {
    private final List<Task> tasks;

    public TaskListResponse(String message, List<Task> tasks) {
        super(message);
        this.tasks = tasks;
    }

    public List<Task> getTasks() {
        return tasks;
    }
}
