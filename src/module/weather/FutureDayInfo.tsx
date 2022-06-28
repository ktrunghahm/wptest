import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import * as React from "react";
import { DailyWeatherData, LocationInfo } from "../common/model";
import UnitSelector from "./UnitsSelector";
import { getWindDirection } from "./utils";

interface IFutureDayInfoProps {
  weatherData?: DailyWeatherData;
  locationInfo?: LocationInfo;
  isMetric: boolean;
  flipUnits: () => void;
}

const FutureDayInfo: React.FunctionComponent<IFutureDayInfoProps> = ({
  locationInfo,
  weatherData,
  isMetric,
  flipUnits,
}) => {
  return (
    <Box display="flex" width={"100%"} padding={"20px"}>
      <Box flexGrow={1}>
        <Typography variant="h6" fontWeight={700}>
          {locationInfo ? (
            `${locationInfo.name}, ${locationInfo.country}`
          ) : (
            <Skeleton width="80px" />
          )}
        </Typography>
        <Typography color="text.secondary" fontSize={"14px"}>
          {!weatherData ? (
            <Skeleton />
          ) : (
            `${moment(weatherData.dt * 1000).format("dddd")} • ${
              weatherData.weather?.[0].main
            }`
          )}
        </Typography>
        <Box display={"flex"} alignItems="center">
          {!weatherData ? (
            <Skeleton
              variant="circular"
              width={"64px"}
              height={"64px"}
              sx={{ marginRight: "8px" }}
            />
          ) : (
            <img
              alt="weather"
              src={`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`}
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
              {!weatherData ? (
                <Skeleton width="40px" />
              ) : (
                `${Math.round(weatherData.temp.max)}°`
              )}
            </Typography>
            <UnitSelector isMetric={isMetric} flipUnits={flipUnits} />
          </Box>
        </Box>
      </Box>
      <Box width={"50%"} paddingTop={7}>
        <Typography variant="body2">
          {weatherData ? (
            `Humidity: ${weatherData.humidity}%`
          ) : (
            <Skeleton width="50px" variant="text" component={"span"} />
          )}
        </Typography>
        <Typography variant="body2">
          {weatherData ? (
            `Wind: ${(isMetric
              ? weatherData.wind_speed * 3.6
              : weatherData.wind_speed
            ).toFixed(2)} ${isMetric ? "KPH" : "MPH"} ${getWindDirection(
              weatherData.wind_deg
            )}`
          ) : (
            <Skeleton width="80px" variant="text" />
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default FutureDayInfo;
