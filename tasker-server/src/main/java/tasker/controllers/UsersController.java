package tasker.controllers;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tasker.api.exceptions.*;
import tasker.api.models.UserModel;
import tasker.api.requests.users.LoginRequest;
import tasker.api.requests.users.RegisterRequest;
import tasker.api.requests.users.UpdateRequest;
import tasker.api.resources.User;
import tasker.api.responses.ApiResponse;
import tasker.api.responses.DataModelResponse;
import tasker.api.responses.TokenResponse;
import tasker.api.services.UsersService;
import tasker.api.utils.Shell;
import tasker.api.utils.Utils;

import java.util.Date;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("users")
public class UsersController {

    /** Constants*/
    public static final String USER_NOT_AUTHORIZED = "User is not authorized to the following operation";
    public static final String REGISTER_SUCCESS_MSG = "User was successfully registered";
    public static final String EMPTY_CREDENTIALS_MSG = "Some credentials are empty";
    public static final String LOGIN_ERROR_MSG = "The credentials provided do not match any user's in the Tasker platform";
    public static final String LOGIN_SUCCESS_MSG = "Login successful";
    public static final String UPDATE_SUCCESS_MSG = "Update successful";
    public static final String DETAILS_SUCCESS_MSG = "User details successfully retrieved";

    @Autowired
    private UsersService usersService;

    @Value("${jwt.secret}")
    private String tokenSecret;


    @PostMapping("login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        try {
            boolean authResult = usersService.authenticateUser(request.username(), request.password());

            // Validate auth result
            if (!authResult) {
                return new ResponseEntity<>(new ApiResponse(LOGIN_ERROR_MSG), HttpStatus.FORBIDDEN);
            }

            String token = Utils.createAuthToken(request.username(), tokenSecret);
            return new ResponseEntity<>(new TokenResponse(LOGIN_SUCCESS_MSG, token), HttpStatus.OK);
        } catch (InvalidRequestDataException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(EMPTY_CREDENTIALS_MSG), HttpStatus.BAD_REQUEST);
        } catch (UserDoesNotExistException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(errorMessage), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest request) {
        try {
            UserModel dataModel = new UserModel(request.username(), request.password(), request.email(),
                    request.firstName(), request.lastName());

            usersService.add(dataModel);
            String token = Utils.createAuthToken(request.username(), tokenSecret);
            return new ResponseEntity<>(new TokenResponse(REGISTER_SUCCESS_MSG, token), HttpStatus.OK);
        } catch (InvalidRequestDataException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(EMPTY_CREDENTIALS_MSG), HttpStatus.BAD_REQUEST);
        } catch (UserAlreadyExistsException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(errorMessage), HttpStatus.CONFLICT);
        } catch (NewPasswordIsToShortException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(errorMessage), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("update")
    public ResponseEntity<ApiResponse> update(@RequestBody UpdateRequest request) {
        try {
            UserModel dataModel = new UserModel(request.username(), request.password(), request.email(),
                    request.firstName(), request.lastName());
            usersService.update(dataModel);
            return new ResponseEntity<>(new DataModelResponse(UPDATE_SUCCESS_MSG, dataModel), HttpStatus.OK);
        } catch (UserNotAuthorizedException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(errorMessage), HttpStatus.FORBIDDEN);
        } catch (InvalidRequestDataException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(EMPTY_CREDENTIALS_MSG), HttpStatus.BAD_REQUEST);
        } catch (UserDoesNotExistException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(errorMessage), HttpStatus.NOT_FOUND);
        }
    }


    /*
     * @TODO Add delete user and get user
     */

    @GetMapping("details/{username}")
    public ResponseEntity<ApiResponse> details(@PathVariable String username, @RequestHeader("Authorization") String token) {
        try {
            User user = usersService.get(username, token, tokenSecret);

            UserModel dataModel = new UserModel(user.getUsername(), "", user.getEmail(), user.getFirstName(), user.getLastName());
            return new ResponseEntity<>(new DataModelResponse(DETAILS_SUCCESS_MSG, dataModel), HttpStatus.OK);
        } catch (UserNotAuthorizedException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(errorMessage), HttpStatus.FORBIDDEN);
        } catch (InvalidRequestDataException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(EMPTY_CREDENTIALS_MSG), HttpStatus.BAD_REQUEST);
        } catch (UserDoesNotExistException e) {
            String errorMessage = e.getMessage();
            Shell.getInstance().printError(errorMessage);
            return new ResponseEntity<>(new ApiResponse(errorMessage), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("validate/{username}")
    public ResponseEntity<Void> validate(@RequestHeader("Authorization") String token, @PathVariable String username) {
        boolean isValid = Utils.validateAuthToken(token, tokenSecret, username);
        return new ResponseEntity<>(isValid ? HttpStatus.NO_CONTENT : HttpStatus.FORBIDDEN);
    }
}
