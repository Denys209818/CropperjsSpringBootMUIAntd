package program.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tbl_car_entity")
@Data
public class CarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    @Column(length = 200, nullable = false)
    private String Brand;
    @Column(length = 200, nullable = false)
    private String Model;
    @Column(length = 200, nullable = false)
    private int Price;

    @OneToMany(mappedBy = "carentity")
    private List<CarImageEntity> carImages;
}
