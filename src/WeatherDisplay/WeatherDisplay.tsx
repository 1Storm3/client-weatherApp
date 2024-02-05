import React from "react";

interface WeatherDisplayProps {
  location: string;
  data: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div className="app">
      <h1>Приложение погоды </h1>
      {data && (
        <div>
          <p>Temperature: {data.temperature} C</p>
          <p>Description: {data.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
