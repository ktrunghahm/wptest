import { Box, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { DailyWeatherData } from "../common/model";

interface IDayCardProps {
  selected: boolean;
  data: DailyWeatherData;
  loading: boolean;
}

const DayCard: React.FunctionComponent<IDayCardProps> = (props) => {
  const { data, selected } = props;
  const dayOfWeek: string | undefined = React.useMemo(() => {
    if (!data) {
      return;
    }
    const dt = moment(data.dt * 1000);
    return dt.format("ddd");
  }, [data]);

  const isLoading = React.useMemo(() => {
    return !data || props.loading;
  }, [data, props.loading]);

  return (
    <Box
      sx={{ backgroundColor: selected ? "#F7F7F7" : "unset" }}
      width="100%"
      height="100%"
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      paddingTop={1.5}
      boxSizing="border-box"
    >
      <Typography variant="subtitle2" fontWeight={700}>
        {isLoading ? <Skeleton></Skeleton> : dayOfWeek}
      </Typography>

      <Box>
        {isLoading ? (
          <Skeleton variant="circular" width={"48px"} height={"48px"} />
        ) : (
          <img
            alt="mainWeather"
            src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
            width={"48px"}
            height={"48px"}
          />
        )}
      </Box>

      <Typography variant="subtitle2" fontWeight={700} fontSize={"18px"}>
        {isLoading ? (
          <Skeleton width={"48px"} />
        ) : (
          `${Math.round(data.temp.max)}°`
        )}
      </Typography>

      <Typography variant="body2" fontSize={"14px"}>
        {isLoading ? (
          <Skeleton width={"48px"} />
        ) : (
          `${Math.round(data.temp.min)}°`
        )}
      </Typography>
    </Box>
  );
};

export default DayCard;
