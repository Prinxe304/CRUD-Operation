package com.weather.weatherP01.entity;

//import java.time.String;


public class DayTemp {

    private String day;
    private Double tempMax;
    private Double tempMin;
    private Double tempAvg;

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public Double getTempMin() {
        return tempMin;
    }

    public void setTempMin(Double tempMin) {
        this.tempMin = tempMin;
    }

    public Double getTempMax() {
        return tempMax;
    }

    public void setTempMax(Double tempMax) {
        this.tempMax = tempMax;
    }

    public Double getTempAvg() {
        return tempAvg;
    }

    public void setTempAvg(Double tempAvg) {
        this.tempAvg = tempAvg;
    }

    public DayTemp(){

    }

    public DayTemp(String day, Double tempMax, Double tempMin, Double tempAvg) {

        this.day = day;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.tempAvg = tempAvg;
    }
}
