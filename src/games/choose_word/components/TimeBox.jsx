import React from "react";
import { Box, Typography } from "@mui/material";
const TimeBox = ({ time }) => {
  return (
    <Box style={{ position: "relative" }}>
      <img
        src="/images/choose_word/time.png"
        alt="score"
        style={{
          position: "relative",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
      <Typography
        sx={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "5%",
          left: "0%",
          color: "#fdd536",
          fontSize: "22px",
          fontWeight: 600,
        }}
      >
        {time}
      </Typography>
    </Box>
  );
};

export default TimeBox;
