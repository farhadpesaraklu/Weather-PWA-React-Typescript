import React, { HtmlHTMLAttributes, useState } from 'react';
import './App.css';
import { fetchWeather } from './api/fetchWeather';

interface Clouds {
  all: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface sys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface WeatherObject {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Wind {
  deg: number;
  speed: number;
}

interface Data {
  base?: string;
  clouds?: Clouds;
  cod?: number;
  coord?: Coord;
  dt?: number;
  id?: number;
  main?: Main;
  name?: string;
  sys?: sys;
  timezone?: number;
  visibility?: number;
  weather?: [WeatherObject];
  wind?: Wind;
}

function App() {
  const [keyword, setKeyword] = useState<string>('');
  const [weather, setWeather] = useState<Data>({});

  const search = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(keyword);
      setWeather(data);
      setKeyword('');
      console.log(data);
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys?.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn ${weather.weather?.[0].icon} @2x.png`} alt={weather.weather?.[0].description}
            />
            <p>{weather.weather?.[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
