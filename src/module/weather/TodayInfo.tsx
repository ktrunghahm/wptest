import { Box, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import * as React from "react";
import useSWR from "swr";
import { API } from "../common/api";
import { AirData, LocationInfo, WeatherData } from "../common/model";
import UnitSelector from "./UnitsSelector";
import { getAirQualityText, getWindDirection } from "./utils";

interface ITodayInfoProps {
  weatherData: WeatherData | undefined;
  locationInfo: LocationInfo;
  isMetric: boolean;
  flipUnits: () => void;
  isLoading: boolean;
}

const TodayInfo: React.FunctionComponent<ITodayInfoProps> = ({
  weatherData,
  locationInfo,
  isMetric,
  flipUnits,
  isLoading,
}) => {
  const { data: airData, isValidating: isLoadingAirData } = useSWR(
    locationInfo ? [locationInfo.lat, locationInfo.lon] : null,
    async (lat, lng) => {
      const res = await fetch(API.getAirQuality(lat, lng));
      if (res.ok) {
        const data: AirData = await res.json();
        return data;
      }
    },
    { revalidateOnFocus: false }
  );

  return (
    <Box display="flex" width={"100%"} padding={"20px"}>
      <Box flexGrow={1}>
        <Typography
          variant="h6"
          fontWeight={700}
        >{`${locationInfo.name}, ${locationInfo.country}`}</Typography>
        <Typography color="text.secondary" fontSize={"14px"}>
          {!weatherData || isLoading ? (
            <Skeleton />
          ) : (
            `${moment(weatherData.current.dt * 1000).format("dddd hA")} • ${
              weatherData.current.weather?.[0].main
            }`
          )}
        </Typography>
        <Box display={"flex"} alignItems="center">
          {!weatherData || isLoading ? (
            <Skeleton
              variant="circular"
              width={"64px"}
              height={"64px"}
              sx={{ marginRight: "8px" }}
            />
          ) : (
            <img
              alt="weather"
              src={`http://openweathermap.org/img/wn/${weatherData.current.weather?.[0].icon}@2x.png`}
              width={"60px"}
              height={"60px"}
              style={{ objectFit: "none", marginRight: 8 }}
            />
          )}
          <Box display="flex">
            <Typography
              variant="h6"
              fontWeight={700}
              fontSize="44px"
              lineHeight={"44px"}
            >
              {!weatherData || isLoading ? (
                <Skeleton width="65px" />
              ) : (
                `${Math.round(weatherData.current.temp)}°`
              )}
            </Typography>
            <UnitSelector isMetric={isMetric} flipUnits={flipUnits} />
          </Box>
        </Box>
      </Box>
      <Box width={"50%"} paddingTop={7}>
        <Typography variant="body2">
          {weatherData && !isLoading ? (
            `Humidity: ${weatherData.current.humidity}%`
          ) : (
            <Skeleton width="50px" variant="text" component={"span"} />
          )}
        </Typography>
        <Typography variant="body2">
          {weatherData && !isLoading ? (
            `Wind: ${(isMetric
              ? weatherData.current.wind_speed * 3.6
              : weatherData.current.wind_speed
            ).toFixed(2)} ${isMetric ? "KPH" : "MPH"} ${getWindDirection(
              weatherData.current.wind_deg
            )}`
          ) : (
            <Skeleton width="80px" variant="text" />
          )}
        </Typography>
        <Typography variant="body2">
          {isLoadingAirData || !airData ? (
            <Skeleton width={"60px"} variant="text" />
          ) : (
            `Air quality: ${getAirQualityText(airData.list?.[0].main.aqi)}`
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default TodayInfo;
