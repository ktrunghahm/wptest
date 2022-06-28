export const WEATHER_API_KEY = "1c5da32bd6a0d1c4c017b21b49833c7f";

export const API = {
  getGeoCoding: (str: string) =>
    `http://api.openweathermap.org/geo/1.0/direct?q=${str}&limit=1&appid=${WEATHER_API_KEY}`,
  getWeather: (lat: number, lng: number, isMetric: boolean = true) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${
      isMetric ? "metric" : "imperial"
    }&appid=${WEATHER_API_KEY}`,
  getAirQuality: (lat: number, lng: number) =>
    `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`,
};
