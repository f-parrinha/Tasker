package tasker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import tasker.api.utils.Shell;
import tasker.api.utils.Utils;

import javax.sql.DataSource;
import java.io.Console;


@SpringBootApplication
public class TaskerServer {
    public record CredentialsRead(String username, String password) {}


    /** Constants */
    public static final int SLEEP_ERROR_STATUS = -1;
    public static final int NO_CONSOLE_ERROR = -2;

    /** Variables */
    @Value("${spring.datasource.url}")
    String dbUrl;

    @Value("${db.username}")
    String dbUsername;

    @Value("${db.password}")
    String dbPassword;


    public static void main(String[] args) {
        SpringApplication.run(TaskerServer.class, args);
    }

    public static void quitServer(int status) {
        Shell.getInstance().printFine("The server is closing...");

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Shell.getInstance().printError(e.getMessage());
            System.exit(SLEEP_ERROR_STATUS);
        }

        System.exit(status);
    }

    public CredentialsRead readCredentials() {
        Console console = System.console();
        if (console == null) {
            Shell.getInstance().printError("No console available");
            quitServer(NO_CONSOLE_ERROR);
            return null;
        }

        Shell.getInstance().printLineInput("Enter Database Username: ");
        String username = console.readLine();
        Shell.getInstance().printLineInput("Enter Database Username: ");
        String password = String.valueOf(console.readPassword());
        return new CredentialsRead(username, password);
    }

    @Bean
    public DataSource configureDb() {
        boolean noCredentialsOnSecret = Utils.isStringNull(dbUsername) || Utils.isStringNull(dbPassword);
        String username = dbUsername;
        String password = dbPassword;

        // Prompt credentials if not found on secret file
        if (noCredentialsOnSecret) {
            CredentialsRead result = readCredentials();
            username = result.username;
            password = result.password;
        }

        return DataSourceBuilder.create()
                .url(dbUrl)
                .username(username)
                .password(password)
                .build();
    }
}