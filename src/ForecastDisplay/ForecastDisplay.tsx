import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";

interface ForecastDisplayProps {
  location: string;
}

// const WeatherChart = ({ forecastData }) => {
//   const chartData = {
//     labels: forecastData.map((day) => day.dayOfWeek),
//     datasets: [
//       {
//         label: "Temperature",
//         data: forecastData.map((day) => day.temperature),
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//       },
//     ],
//   };
//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };
//   return (
//     <div>
//       <line data={chartData} options={chartOptions} />
//     </div>
//   );
// };

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ location }) => {
  // const [forecastData, setForecastData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/");
  //       const data = await response.json();
  //       setForecastData(data);
  //     } catch (error) {
  //       console.error("error pri prognoze", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <div>
      <h2>Погода в {location} на неделю</h2>
      {/* <WeatherChart forecastData={forecastData} /> */}
    </div>
  );
};

export default ForecastDisplay;
