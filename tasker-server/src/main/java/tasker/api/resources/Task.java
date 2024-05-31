package tasker.api.resources;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Task  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Integer priority;
    private String username;

    /* Leave empty constructor so that Spring can generate a value to 'id' */

    /** SETTERS */
    public void setUsername(String username) {
        this.username = username;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    /** GETTERS */
    public Long getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getDescription() {
        return description;
    }
    public int getPriority() {
        return priority;
    }
}
