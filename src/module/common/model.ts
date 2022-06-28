export interface LocationInfo {
  country: string;
  name: string;
  lat: number;
  lon: number;
}

export interface DailyWeatherData {
  dt: number;
  humidity: number;
  wind_deg: number;
  wind_speed: number;
  temp: { min: number; max: number };
  weather: { icon: string; main: string }[];
}

export interface WeatherData {
  current: {
    dt: number;
    humidity: number;
    wind_deg: number;
    wind_speed: number;
    temp: number;
    weather: { icon: string; main: string }[];
  };
  daily: DailyWeatherData[];
}

export interface AirData {
  list: { dt: number; main: { aqi: number } }[];
}
