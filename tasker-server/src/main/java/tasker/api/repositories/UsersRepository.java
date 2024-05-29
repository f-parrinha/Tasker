package tasker.api.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tasker.api.resources.User;

@Repository
public interface UsersRepository extends CrudRepository<User, String> {
}
