import React, { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  description: string;
}
const Main = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("http://localhost:5001/weather");
        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("error data:", error);
      }
    };
    fetchWeather();
  }, []);
  return (
    <div className="app">
      <h1>Weather App</h1>
      {weather && (
        <div>
          <p>Temperature: {weather.temperature} C</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
    </div>
  );
};

export default Main;
