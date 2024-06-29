import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { openAudio } from "../../../utils/audioUtils";
const BoxWord = ({ word }) => {
  const [heightImg, setHeightImg] = useState("100px");
  const [wordVisibility, setWordVisibility] = useState("hidden");

  return (
    <div>
      <Box
        sx={{
          borderRadius: "9px",
          height: "100px",
          width: "160px",
          border: "2px solid black",
          backgroundColor: "white",
          objectFit: "contain",
        }}
        onMouseEnter={() => {
          setHeightImg("70px");
          setWordVisibility("visible");
        }}
        onMouseLeave={() => {
          setHeightImg("100px");
          setWordVisibility("hidden");
        }}
        onClick={() => {
          openAudio(word.audioURL);
        }}
      >
        <img
          src={word.imageURL}
          alt="hinh anh"
          style={{
            height: heightImg,
            width: "160px",
            objectFit: "contain",
          }}
        ></img>
        <Typography
          sx={{ visibility: wordVisibility, lineHeight: "20px", color: "red" }}
        >
          {word.word}
        </Typography>
      </Box>
    </div>
  );
};

export default BoxWord;
