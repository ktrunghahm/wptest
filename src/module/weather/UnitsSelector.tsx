import { Box } from "@mui/material";
import * as React from "react";

interface IUnitSelectorProps {
  isMetric: boolean;
  flipUnits: () => void;
}

const UnitSelector: React.FunctionComponent<IUnitSelectorProps> = ({
  isMetric,
  flipUnits,
}) => {
  return (
    <Box
      marginLeft={1}
      alignSelf={"self-start"}
      typography="body2"
      display="flex"
      alignItems={"center"}
    >
      {isMetric ? (
        <>
          <Box component={"span"} style={{ textDecorationLine: "underline" }}>
            C
          </Box>
          &nbsp;/&nbsp;
          <Box
            onClick={flipUnits}
            component={"span"}
            style={{ cursor: "pointer" }}
          >
            F
          </Box>
        </>
      ) : (
        <>
          <Box
            onClick={flipUnits}
            component={"span"}
            style={{ cursor: "pointer" }}
          >
            C
          </Box>
          &nbsp;/&nbsp;
          <Box component={"span"} style={{ textDecorationLine: "underline" }}>
            F
          </Box>
        </>
      )}
    </Box>
  );
};

export default UnitSelector;
