package tasker.api.requests.tasks;

public record UpdateTaskRequest(Long id, String description, Integer priority) {
}
