package com.weather.weatherP01.Service;


import com.weather.weatherP01.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Service
public class WeatherService {

    @Value("${spring.api.key}")
    private String apiKey;

    @Value("${spring.api.url}")
    private String apiUrl;

    @Value("${spring.api.forecast.key}")
    private String apiFKey;

    @Value("${spring.api.forecast.url}")
    private String apiFUrl;

    public String test(){
        return "hello";
    }

    private RestTemplate restTemplate = new RestTemplate();

ArrayList<DayTemp> dayTempList = new ArrayList<>();
    public Weather getdata(String city){
        String urlData = apiUrl + "?key=" +  apiKey + "&q=" + city;
        Root r = restTemplate.getForObject(urlData, Root.class);
        Weather w = new Weather();
        w.setCountry(r.getLocation().country);
        w.setCity(r.getLocation().name);
        w.setTemperature(r.getCurrent().temp_c);
        w.setCondition(r.getCurrent().getCondition().text);

        return w;
    }

    public WeatherForecast getForecastData(String city , int day){
        WeatherForecast wf = new WeatherForecast();
        Weather w = getdata(city);
        wf.setWeather(w);

        String urlData = apiFUrl + "?key=" +  apiFKey + "&q=" + city +"&days="+day;
        Root r = restTemplate.getForObject(urlData, Root.class);
        Forecast forecast = r.getForecast();
        ArrayList<Forecastday> forecastday = forecast.getForecastday();


        for(Forecastday d : forecastday){
            DayTemp dt = new DayTemp();
            dt.setTempMax(d.getDay().maxtemp_c);
            dt.setTempAvg(d.getDay().avgtemp_c);
            dt.setTempMin(d.getDay().mintemp_c);
            dt.setDay(d.date);
            dayTempList.add(dt);
        }

        wf.setDay_temp(dayTempList);
        return wf;
    }




}
