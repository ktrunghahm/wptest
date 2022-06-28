import { alpha, InputBase, styled } from "@mui/material";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  border: "1px solid rgba(150, 150, 150, 0.3)",
  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    "box-shadow",
  ]),
  borderRadius: 4,
  position: "relative",
  backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#2b2b2b",
  padding: "10px 12px",
  "&.Mui-focused": {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-error": {
    boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.error.main,
  },
}));
