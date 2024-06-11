package tasker.api.repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tasker.api.resources.Task;
import tasker.api.resources.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskerRepository extends JpaRepository<Task, Long> {
    List<Task> findAll(Sort sort);
    List<Task> findByUsername(String username, Sort sort);
    Optional<Task> findByIdAndUsername(Long id, String username);
    void deleteByUsername(String username);
}
