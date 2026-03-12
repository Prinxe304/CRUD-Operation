package com.weather.weatherP01.entity;

import java.util.ArrayList;

public class Forecast{
    public ArrayList<Forecastday> forecastday;


    public Forecast(ArrayList<Forecastday> forecastday) {
        this.forecastday = forecastday;
    }

    public Forecast() {
    }

    public ArrayList<Forecastday> getForecastday() {
        return forecastday;
    }

    public void setForecastday(ArrayList<Forecastday> forecastday) {
        this.forecastday = forecastday;
    }
}