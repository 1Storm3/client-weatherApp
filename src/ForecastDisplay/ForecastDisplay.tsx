import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import s from "./ForecastDisplay.module.css";

interface ForecastDisplayProps {
  location: string;
}

interface ForecastData {
  dayOfWeek: string;
  temperature: number;
  description: string;
}

interface WeeklyForecastData {
  weeklyForecast: ForecastData[];
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ location }) => {
  const [forecastData, setForecastData] = useState<WeeklyForecastData>({
    weeklyForecast: [],
  });

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://weatherapp-32hv.onrender.com/weather?location=${location}`
        );

        // `http://localhost:5001/weather?location=${location}`
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    };
    fetchData();

    return () => {
      // Удаляем предыдущий график при размонтировании компонента
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [location]);

  useEffect(() => {
    if (chartRef.current && forecastData.weeklyForecast?.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Создаем новый график при обновлении данных о погоде
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: forecastData.weeklyForecast.map((day) => day.dayOfWeek),
            datasets: [
              {
                label: "Температура (°C)",
                data: forecastData.weeklyForecast.map((day) => day.temperature),
                borderColor: "rgb(75, 192, 194)",
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Добавляем прозрачный фон
                pointBackgroundColor: "rgb(75, 192, 192)", // Цвет точек данных
                pointBorderColor: "rgb(75, 192, 192)",
                pointHoverBackgroundColor: "rgb(75, 192, 192)",
                pointHoverBorderColor: "rgb(75, 192, 193)",
                tension: 0.4, // Увеличиваем натяжение кривой
              },
            ],
          },
          options: {
            scales: {
              x: {
                ticks: {
                  color: "black", // цвет подписей оси X
                },
              },
              y: {
                ticks: {
                  color: "black", // цвет подписей оси Y
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)", // цвет сетки на фоне графика
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "black", // цвет текста легенды
                },
              },
            },
            animation: {
              duration: 2000, // Продолжительность анимации в миллисекундах
              easing: "easeInOutQuart", // Тип анимации
            },
          },
        });
      }
    }
  }, [forecastData]);

  return (
    <div className={s.container}>
      {forecastData.weeklyForecast?.length > 0 && (
        <>
          <h2 className={s.weekWeather}>Погода на неделю</h2>
          <ul>
            {forecastData.weeklyForecast?.map((day, index) => (
              <li key={index}>
                <strong>{day.dayOfWeek}</strong>
                <div>
                  <span> Температура: {day.temperature}</span>
                  <span>°C, Описание: {day.description}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.graph}>
            <canvas ref={chartRef}></canvas>
          </div>
        </>
      )}
      <div className={s.copyright}>
        Developed by
        <a href="https://t.me/StormEV">STORM</a>
      </div>
    </div>
  );
};

export default ForecastDisplay;
