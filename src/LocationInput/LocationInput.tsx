import LoadingSpinner from "LoadingSpinner/LoadingSpinner";
import React, { useState } from "react";

interface LocationInputProps {
  onLocationChange: (location: string, weatherData: any) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/weather?location=${location}`
      );
      const data = await response.json();
      onLocationChange(location, data);
    } catch (error) {
      console.error("error fetch", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введи город"
          value={location}
          onChange={handleInputChange}
        ></input>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : " Отправить"}
        </button>
      </form>
    </div>
  );
};

export default LocationInput;
