package com.weather.weatherP01.Controller;


import com.weather.weatherP01.Service.WeatherService;
import com.weather.weatherP01.entity.Root;
import com.weather.weatherP01.entity.Weather;
import com.weather.weatherP01.entity.WeatherForecast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/weather")
@CrossOrigin
public class WeatherController {



    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{city}")
    public String getCity(@PathVariable String city) {
        return weatherService.test();
    }


    @GetMapping("/temp/{city}")
    public Weather getData(@PathVariable String city) {
        return weatherService.getdata(city);
    }


    @GetMapping("/forecast/{city}/{day}")
    public WeatherForecast getDataa(@PathVariable String city, @PathVariable Integer day) {
        return weatherService.getForecastData(city , day);
    }

}
