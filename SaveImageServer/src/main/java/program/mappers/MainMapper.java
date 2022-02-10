package program.mappers;

import org.mapstruct.Mapper;
import program.entities.CarEntity;
import program.entities.CarImageEntity;
import program.models.carmodels.AddCarModel;
import program.models.carmodels.ImageData;

@Mapper(componentModel = "spring")
public interface MainMapper {
    CarEntity ConverToCarEntity(AddCarModel model);

    CarImageEntity ConvertToCarImageEntity(ImageData models);
}
