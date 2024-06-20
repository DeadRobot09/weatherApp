"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import DehazeIcon from '@mui/icons-material/Dehaze';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

let WEATHER_API_KEY = '42dd43bcd7257676dedf4eb4dc160670';

export default function Home() {
  const [place, setPlace] = useState("Delhi");
  const [placeData, setPlaceData] = useState<any>(null);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const fetchWeatherData = async (place: string) => {
    if (!place) return null;  // Check if the place is not empty
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;  // Return the data for further processing
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;  // Return null in case of error
    }
  };
  
  // Function to handle the weather data retrieval process
  const getWeatherData = async () => {
    const data = await fetchWeatherData(place);
    if (data) {
      console.log("Get weather data Response", data);
      setPlaceData(data);  // Update your state or process the data as required
    } else {
      console.log("Failed to fetch weather data for:", place);
    }
  };
  
  // Call getWeatherData function when needed


  useEffect(() => {
    getWeatherData();
  }, [place]);

  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input type="search" placeholder="city-Name" onChange={(e) => setPlace(e.target.value)} />
        <button onClick={getWeatherData}><SearchIcon /></button>
      </div>
      {placeData && placeData.weather && placeData.main && (
        <div className={styles.row}>
          <div className={styles.section1}>
            <div className={styles.section11}>
              {placeData.weather[0].main === 'Clouds' && <FilterDramaIcon className={styles.weathericon} />}
              {placeData.weather[0].main === 'Haze' && <DehazeIcon className={styles.weathericon} />}
              {placeData.weather[0].main === 'Smoke' && <VapingRoomsIcon className={styles.weathericon} />}
              {placeData.weather[0].main === 'Clear' && <WbSunnyIcon className={styles.weathericon} />}
              {placeData.weather[0].main === 'Rainy' && <UmbrellaIcon className={styles.weathericon} />}

              <p className={styles.temp}>{(placeData.main.temp - 273.15).toFixed(1)} <span>°C</span></p>
            </div>
            <div className={styles.section11}>
              <p className={styles.city}>{placeData.name}</p>
              <p className={styles.weathertype}>{placeData.weather[0].main}</p>
            </div>
          </div>

          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
        </div>
      )}
      {placeData && placeData.main && (
        <div className={styles.section2}>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature</p>
            <p className={styles.head2}>{(placeData.main.temp - 273.15).toFixed(1)} °C</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Min</p>
            <p className={styles.head2}>{(placeData.main.temp_min - 273.15).toFixed(1)} °C</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Temperature Max</p>
            <p className={styles.head2}>{(placeData.main.temp_max - 273.15).toFixed(1)} °C</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Humidity</p>
            <p className={styles.head2}>{placeData.main.humidity} %</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Pressure</p>
            <p className={styles.head2}>{placeData.main.pressure} hPa</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Visibility</p>
            <p className={styles.head2}>{placeData.visibility / 1000} km</p>
          </div>
          <div className={styles.section21}>
            <p className={styles.head1}>Wind speed</p>
            <p className={styles.head2}>{placeData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
