import React from "react";
import { Box, Typography } from "@mui/material";
const InfoBox = ({ title, srcImg, progress, percentage }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#e9f8f9",
        width: "220px",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <img src={srcImg} alt="chart" style={{ scale: "1.2" }}></img>
      <Typography sx={{ fontSize: 20, fontWeight: 600, marginTop: "10px" }}>
        {title}
      </Typography>
      <Typography sx={{ color: "#00949c", fontSize: 40, fontWeight: 700 }}>
        {progress}
        {percentage ? "%" : ""}
      </Typography>
    </Box>
  );
};

export default InfoBox;
