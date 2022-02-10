package program.controllers;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import program.entities.CarEntity;
import program.entities.CarImageEntity;
import program.mappers.MainMapper;
import program.models.carmodels.AddCarModel;
import program.models.carmodels.ImageData;
import program.repositories.CarImageRepository;
import program.repositories.CarRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/car")
public class CarController {
    private final CarRepository repository;
    private final CarImageRepository carImageRepository;
    private final MainMapper mapper;

    @PostMapping("/add")
    public int AddCarToDatabase(@RequestBody AddCarModel model)
    {
        CarEntity car = mapper.ConverToCarEntity(model);

        repository.save(car);
        Gson gson = new Gson();

        ImageData[] images = gson.fromJson(model.Files, ImageData[].class);

        for(ImageData img : images)
        {
            CarImageEntity carImageEntity = mapper.ConvertToCarImageEntity(img);
            carImageEntity.setCarentity(car);
            carImageRepository.save(carImageEntity);

        }
        return car.getId();
    }
}
