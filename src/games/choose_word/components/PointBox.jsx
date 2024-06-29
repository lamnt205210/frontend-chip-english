import React from "react";
import { Box, Typography } from "@mui/material";
const PointBox = ({ point }) => {
  console.log(point);
  return (
    <Box style={{ position: "relative" }}>
      <img
        src="/images/choose_word/background_score.jpg"
        alt="score"
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
      <Typography
        sx={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          marginTop: "2px",
          marginRight: "2px",
          color: "#fdd536",
          fontSize: "20px",
          fontWeight: 600,
          width: "110px",
        }}
      >
        {Math.floor(point)} ĐIỂM
      </Typography>
    </Box>
  );
};

export default PointBox;
