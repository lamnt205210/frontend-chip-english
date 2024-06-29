import React from "react";

import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: "#4ec4be",
        height: "160px",
      }}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="body1" fontWeight="bold">
          Copyright © 2024 CHIP ENGLISH
        </Typography>
        <Typography variant="body1">All rights reserved</Typography>
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h6" fontWeight="bold">
          HỆ THỐNG HỌC TIẾNG ANH ONLINE DÀNH CHO TRẺ EM
        </Typography>
        <Typography variant="body1">
          Liên hệ:{" "}
          <a href="mailto:ngothilam12a8@gmail.com">chipenglish@chip.edu.com</a>
        </Typography>
      </Box>
    </Box>
  );
};
