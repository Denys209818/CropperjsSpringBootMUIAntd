package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.CarImageEntity;

@Repository
public interface CarImageRepository extends JpaRepository<CarImageEntity, Integer> {

}
