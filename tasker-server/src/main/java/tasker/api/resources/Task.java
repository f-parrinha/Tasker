package tasker.api.resources;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Integer priority;

    /* Leave empty constructor so that Spring can generate a value to 'id' */

    /** SETTERS */
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
    public String getDescription() {
        return description;
    }
    public int getPriority() {
        return priority;
    }
}
