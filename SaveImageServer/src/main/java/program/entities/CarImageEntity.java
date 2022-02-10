package program.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "tbl_car_image_entity")
@Data
public class CarImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    @Column(length = 200, nullable = false)
    private String Code;
    @Column(length = 200, nullable = false)
    private String Uid;

    @ManyToOne
    @JoinColumn(name = "carentity_id", nullable=false)
    private CarEntity carentity;
}
