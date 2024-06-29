import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
const LoadingComponent = (props) => {
  const { open } = props;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => {}}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingComponent;
