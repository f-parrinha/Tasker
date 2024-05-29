package tasker.api.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tasker.api.exceptions.InvalidRequestDataException;
import tasker.api.exceptions.TaskDoesNotExistException;
import tasker.api.models.TaskModel;
import tasker.api.repositories.TaskerRepository;
import tasker.api.resources.Task;
import tasker.api.utils.Utils;

import java.util.*;


@Service
public class TaskerService {

    @Autowired
    private TaskerRepository taskerRepository;

    /**
     * Adds a new task to the db. There can be tasks with the same description and priority, since they will have different ids
     * @param description the task's description
     * @param priority the task's priority
     * @return all tasks
     * @throws InvalidRequestDataException there is corrupt data being sent
     */
    @Transactional
    public List<Task> add(String description, Integer priority) throws InvalidRequestDataException {
        if (Utils.isStringNull(description) || priority == null) {
            throw new InvalidRequestDataException("Add Task");
        }

        // Add new task
        Task task = new Task();
        task.setDescription(description);
        task.setPriority(priority);
        taskerRepository.save(task);
        return getAllTasks();
    }

    @Transactional
    public List<Task> update(TaskModel model) throws InvalidRequestDataException, TaskDoesNotExistException {
        if (model.isDataCorrupt()) {
            throw new InvalidRequestDataException("Add Task");
        }

        // Check Task existence
        Optional<Task> query = taskerRepository.findById(model.id());
        if (query.isEmpty()) {
            throw new TaskDoesNotExistException();
        }

        // Update task
        Task result = query.get();
        result.setDescription(model.description());
        result.setPriority(model.priority());
        taskerRepository.save(result);
        return getAllTasks();
    }

    @Transactional
    public List<Task> delete(Long id) throws InvalidRequestDataException, TaskDoesNotExistException {
        if (id == null) {
            throw new InvalidRequestDataException("Delete Task");
        }

        // Check task existence
        Optional<Task> query = taskerRepository.findById(id);
        if (query.isEmpty()) {
            throw new TaskDoesNotExistException();
        }

        taskerRepository.deleteById(id);
        return getAllTasks();
    }

    public Task getTask(Long id) throws InvalidRequestDataException, TaskDoesNotExistException {
        if (id == null) {
            throw new InvalidRequestDataException("Get Task");
        }

        // Check task existence
        Optional<Task> query = taskerRepository.findById(id);
        if (query.isEmpty()) {
            throw new TaskDoesNotExistException();
        }

        return query.get();
    }

    public List<Task>  getAllTasks() {
        Sort sort = Sort.by(Sort.Order.desc("priority"), Sort.Order.asc("description"));
        Iterator<Task> pointer = taskerRepository.findAll(sort).iterator();
        List<Task> tasks = new LinkedList<>();

        // Add tasks
        while (pointer.hasNext()) {
            tasks.add(pointer.next());
        }

        return tasks;
    }
}
