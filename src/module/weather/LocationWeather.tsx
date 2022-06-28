
import {
  Box, Typography
} from "@mui/material";
import * as React from "react";
import useSWR from "swr";
import { ReactComponent as NoResult } from "../../svg/no-result.svg";
import { API } from "../common/api";
import { LocationInfo } from "../common/model";
import DayCard from "./DayCard";
import FutureDayInfo from "./FutureDayInfo";
import TodayInfo from "./TodayInfo";


interface ILocationWeatherProps { locationStr: string }

const LocationWeather: React.FunctionComponent<ILocationWeatherProps> = ({ locationStr }) => {
  const [isMetric, setMetric] = React.useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(0);

  const { data: locationLatLngSearchData, isValidating: loadingLatLng } =
    useSWR(
      locationStr || null,
      async (str) => {
        const res = await fetch(API.getGeoCoding(locationStr), { method: "GET" });
        if (res.ok) {
          const body = await res.json();
          return body;
        }
      },
      { revalidateOnFocus: false }
    );

  const locationInfo: LocationInfo | undefined = React.useMemo(() => {
    return locationLatLngSearchData?.[0];
  }, [locationLatLngSearchData]);

  const { data: locationWeatherData, isValidating: loadingWeatherData } =
    useSWR(
      locationInfo ? [locationInfo.lat, locationInfo.lon, isMetric] : null,
      async (lat, lng, isMetric) => {
        const res = await fetch(
          API.getWeather(lat, lng, isMetric),
          {
            method: "GET",
          }
        );
        if (res.ok) {
          const body = await res.json();
          return body;
        }
      },
      { revalidateOnFocus: false }
    );

  const isLoading = React.useMemo(() => {
    return loadingLatLng || loadingWeatherData;
  }, [loadingLatLng, loadingWeatherData]);

  React.useEffect(() => { setSelectedDayIndex(0) }, [locationStr])

  return (
    <Box>
      <Box height={300}
        width="auto"
        sx={{
          border: "1px solid rgba(150, 150, 150, 0.3)",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
        }}
      >
        {!locationInfo && !isLoading ? (
          locationStr ? (
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              flexDirection="column"
              height={"100%"}
            >
              <Box>
                <NoResult />
              </Box>
              <Typography marginTop={1}>
                We could not find weather information for the location above
              </Typography>
            </Box>
          ) : (
            <Box></Box>
          )
        ) : (
          <>
            <Box height={300 - 143}>
              {selectedDayIndex === 0 && locationInfo ? (
                <TodayInfo
                  weatherData={locationWeatherData}
                  locationInfo={locationInfo}
                  isLoading={loadingWeatherData}
                  isMetric={isMetric}
                  flipUnits={() => setMetric((old) => !old)}
                />
              ) : (
                <FutureDayInfo
                  weatherData={locationWeatherData?.daily[selectedDayIndex]}
                  locationInfo={locationInfo}
                  isMetric={isMetric}
                  flipUnits={() => setMetric((old) => !old)}
                />
              )}
            </Box>
            <Box height={143} display="flex">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((one) => (
                <Box
                  key={one}
                  flex={1}
                  onClick={() => setSelectedDayIndex(one)}
                  sx={{ border: "1px solid #969696", cursor: "pointer" }}
                >
                  <DayCard
                    selected={one === selectedDayIndex}
                    data={locationWeatherData?.daily[one]}
                    loading={isLoading}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LocationWeather;
