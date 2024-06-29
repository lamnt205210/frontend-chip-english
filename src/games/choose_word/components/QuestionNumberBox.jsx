import React from "react";
import { Box, Typography } from "@mui/material";
const QuestionNumberBox = ({ numberQuestion, total }) => {
  return (
    <Box style={{ position: "relative" }}>
      <img
        src="/images/choose_word/quest.png"
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
          color: "white",
          fontSize: "20px",
          fontWeight: 550,
        }}
      >
        {numberQuestion}/{total}
      </Typography>
    </Box>
  );
};

export default QuestionNumberBox;
