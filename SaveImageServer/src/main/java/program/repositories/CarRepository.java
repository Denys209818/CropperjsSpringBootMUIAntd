package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.CarEntity;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, Integer> {
}
