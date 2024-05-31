package tasker.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tasker.api.exceptions.InvalidRequestDataException;
import tasker.api.exceptions.TaskDoesNotExistException;
import tasker.api.models.TaskModel;
import tasker.api.responses.ApiResponse;
import tasker.api.responses.TaskListResponse;
import tasker.api.services.TaskerService;
import tasker.api.requests.tasks.AddTaskRequest;
import tasker.api.requests.tasks.UpdateTaskRequest;
import tasker.api.resources.Task;
import tasker.api.utils.Shell;
import tasker.api.utils.Utils;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/tasker")
public class TaskerController {

    /** CONSTANTS */
    public static final String EMPTY_VALUES_MSG = "Description or priority is empty";
    public static final String ADD_SUCCESS_MSG = "Task was successfully added";
    public static final String REMOVE_SUCCESS_MSG = "Task was successfully removed";
    public static final String UPDATE_SUCCESS_MSG = "Task was successfully updated";
    public static final String GET_ALL_SUCCESS_MSG = "Tasks were successfully retrieved";
    public static final String NO_ID_GIVEN_MSG = "No id was given for message removal";
    public static final String TASK_DOES_NOT_EXIST_MSG = "No task was found with the provided id";
    public static final String INVALID_DATA_IN_REQUEST_MSG = "Invalid data was sent. There may be empty values";

    @Autowired
    private TaskerService taskerService;

    @Value("${jwt.secret}")
    private String tokenSecret;


    @PostMapping("{username}/add")
    public ResponseEntity<ApiResponse> add(@PathVariable String username, @RequestBody AddTaskRequest request, @RequestHeader("Authorization") String token) {
        try {
            if (!Utils.validateAuthToken(token, tokenSecret, username)) {
                return new ResponseEntity<>(new ApiResponse("User not authenticated for this operation"), HttpStatus.FORBIDDEN);
            }

            List<Task> tasks = taskerService.add(username, request.description(), request.priority());
            return new ResponseEntity<>(new TaskListResponse(ADD_SUCCESS_MSG, tasks), HttpStatus.OK);
        } catch (InvalidRequestDataException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(EMPTY_VALUES_MSG), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{username}/delete")
    public ResponseEntity<ApiResponse> remove(@PathVariable String username, @RequestParam Long id, @RequestHeader("Authorization") String token) {
        try {
            if (!Utils.validateAuthToken(token, tokenSecret, username)) {
                return new ResponseEntity<>(new ApiResponse("User not authenticated for this operation"), HttpStatus.FORBIDDEN);
            }

            List<Task> tasks = taskerService.delete(username, id);
            return new ResponseEntity<>(new TaskListResponse(REMOVE_SUCCESS_MSG, tasks), HttpStatus.OK);
        } catch (InvalidRequestDataException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(NO_ID_GIVEN_MSG), HttpStatus.BAD_REQUEST);
        } catch (TaskDoesNotExistException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(TASK_DOES_NOT_EXIST_MSG), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{username}/update")
    public ResponseEntity<ApiResponse> update(@PathVariable String username, @RequestBody UpdateTaskRequest request, @RequestHeader("Authorization") String token) {
        try {
            if (!Utils.validateAuthToken(token, tokenSecret, username)) {
                return new ResponseEntity<>(new ApiResponse("User not authenticated for this operation"), HttpStatus.FORBIDDEN);
            }

            TaskModel dataModel = new TaskModel(request.id(), request.description(), request.priority());
            List<Task> tasks = taskerService.update(username, dataModel);
            return new ResponseEntity<>(new TaskListResponse(UPDATE_SUCCESS_MSG, tasks), HttpStatus.OK);
        } catch (TaskDoesNotExistException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(TASK_DOES_NOT_EXIST_MSG), HttpStatus.NOT_FOUND);
        } catch (InvalidRequestDataException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(INVALID_DATA_IN_REQUEST_MSG), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{username}/tasks")
    public ResponseEntity<ApiResponse> tasks(@PathVariable String username, @RequestHeader("Authorization") String token) {
        if (!Utils.validateAuthToken(token, tokenSecret, username)) {
            return new ResponseEntity<>(new ApiResponse("User not authenticated for this operation"), HttpStatus.FORBIDDEN);
        }

        List<Task> tasks = taskerService.getAllTasks(username);
        return new ResponseEntity<>(new TaskListResponse(GET_ALL_SUCCESS_MSG, tasks), HttpStatus.OK);
    }
}
