import React from "react";
import s from "./WeatherDisplay.module.css";
interface WeatherDisplayProps {
  data: {
    currentWeather: {
      temperature: number;
      description: string;
    };
  } | null;
  location: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, location }) => {
  if (!data) {
    return <div className={s.error}>Данные о погоде отсутствуют</div>;
  }

  const { currentWeather } = data;

  if (!currentWeather) {
    return <div className={s.error}>Данные о погоде отсутствуют</div>;
  }

  const { temperature, description } = currentWeather;

  return (
    <div className="app">
      <div className={s.location}>Выбранный город: {location}</div>
      <h2 className={s.weather}>Погода на сегодня</h2>
      <div className={s.tempDesc}>
        <p>Температура: {temperature} °C</p>
        <p>Описание: {description}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
