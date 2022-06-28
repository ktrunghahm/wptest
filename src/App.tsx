import { Box, FormControl, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { BootstrapInput } from "./module/common/element";
import LocationWeather from "./module/weather/LocationWeather";
import ClearIcon from "@mui/icons-material/Clear";
interface IForm {
  name: string;
}

function App() {
  const [locationStr, setLocationStr] = React.useState("");

  const { control, handleSubmit, setValue, setFocus } = useForm<IForm>({
    defaultValues: { name: "" },
  });

  const searchLocation = React.useCallback((data: IForm) => {
    setLocationStr(data.name.trim());
  }, []);

  return (
    <Box width={590} marginX="auto" marginTop={10}>
      <form style={{ marginBottom: 8 }} onSubmit={handleSubmit(searchLocation)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({
            field: { onChange, value, ref, name },
            fieldState: { error },
          }) => (
            <FormControl variant="outlined" fullWidth error={!!error}>
              <BootstrapInput
                inputRef={ref}
                onChange={onChange}
                fullWidth
                value={value}
                placeholder="Enter a city"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setLocationStr("");
                        setValue(name, "");
                        setFocus(name);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
        ></Controller>
      </form>

      <LocationWeather locationStr={locationStr} />
    </Box>
  );
}

export default App;
