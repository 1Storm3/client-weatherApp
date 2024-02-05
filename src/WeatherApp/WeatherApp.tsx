import React, { useState } from "react";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import ForecastDisplay from "../ForecastDisplay/ForecastDisplay";
import LocationInput from "../LocationInput/LocationInput";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "./WeatherApp.module.css";

const WeatherApp = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any | null>(null);

  const onLocationChange = async (location: string, data: any) => {
    setIsLoading(true);
    setWeatherData(data);
    setCurrentLocation(location);
    setIsLoading(false);
  };

  return (
    <div className={s.app}>
      <LocationInput onLocationChange={onLocationChange} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {weatherData && (
            <WeatherDisplay location={currentLocation} data={weatherData} />
          )}
          <ForecastDisplay location={currentLocation} />
        </>
      )}
    </div>
  );
};

export default WeatherApp;
