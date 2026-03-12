package com.weather.weatherP01.entity;

import java.util.ArrayList;
import java.util.List;

public class WeatherForecast {
    private Weather weather;
    private List<DayTemp> day_temp;

    public WeatherForecast() {
    }

    public WeatherForecast(Weather weather, List<DayTemp> day_temp) {
        this.weather = weather;
        this.day_temp = day_temp;
    }

    public Weather getWeather() {
        return weather;
    }

    public void setWeather(Weather weather) {
        this.weather = weather;
    }

    public List<DayTemp> getDay_temp() {
        return day_temp;
    }

    public void setDay_temp(List<DayTemp> day_temp) {
        this.day_temp = day_temp;
    }
}
