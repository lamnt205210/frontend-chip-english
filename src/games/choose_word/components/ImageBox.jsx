import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { openAudio } from "../../../utils/audioUtils";
const ImageBox = ({ word }) => {
  useEffect(() => {
    openAudio(word.audioURL);
  }, [word]);
  return (
    <Box style={{ position: "relative" }}>
      <img
        src={word.imageURL}
        alt="score"
        style={{
          position: "relative",
          height: "220px",
          width: "260px",
          objectFit: "contain",
          borderRadius: "10px",
          backgroundColor: "#888484",
          border: "2px solid #0b0b0b",
        }}
      />
      <img
        src="/images/choose_word/sound.png"
        alt="sound"
        style={{
          position: "absolute",
          height: "25px",
          width: "25px",
          objectFit: "contain",
          borderRadius: "20px",
          border: "2px solid #ffffff",

          bottom: "12%",
          right: "10%",
          transform: "translate(50%, 50%)",
        }}
        onClick={() => {
          openAudio(word.audioURL);
        }}
      />
    </Box>
  );
};

export default ImageBox;
