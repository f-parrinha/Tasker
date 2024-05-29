package tasker.api.repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tasker.api.resources.Task;

import java.util.List;

@Repository
public interface TaskerRepository extends JpaRepository<Task, Long> {
    List<Task> findAll(Sort sort);
}
