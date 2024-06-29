import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { openAudio } from "../utils/audioUtils";
import { updateGameScore } from "../services/ProgressService";
import { GetUserId } from "./GetUserId";
import { useQueryClient } from "@tanstack/react-query";
const Finish = ({ point, handleReplay, lessonId, gameId }) => {
  const userId = GetUserId();

  const queryClient = useQueryClient();

  useEffect(() => {
    updateGameScore(userId, gameId, lessonId, point)
      .then((response) => {
        queryClient.invalidateQueries("gameProgress");
        console.log(response);
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  }, []);
  const canvasRef = useRef(null);
  const evaluate = (score) => {
    if (score >= 0 && score <= 25) {
      return 1;
    } else if (score > 25 && score <= 50) {
      return 2;
    } else if (score > 50 && score <= 75) {
      return 3;
    } else if (score > 75 && score <= 100) {
      return 4;
    } else {
      return "Invalid score. Please enter a number between 0 and 100.";
    }
  };
  const rate = evaluate(point);
  useEffect(() => {
    if (rate === 1) {
      openAudio("/audio/TryAgain.mp3");
    } else if (rate === 2) {
      openAudio("/audio/NiceTry.mp3");
    } else if (rate === 3) {
      openAudio("/audio/GoodJob.mp3");
    } else {
      openAudio("/audio/Excellent.mp3");
    }
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/sentence_monkey/bg.png"; // Update this path to the correct one
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      // Vẽ các đối tượng game khác tại đây
    };

    // Thêm các sự kiện và logic game khác tại đây
  }, []);
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ borderRadius: "0" }}
        width={1000}
        height={550}
      ></canvas>

      <Box
        sx={{
          position: "absolute",
          left: "10%",
          top: "9%",

          zIndex: 900,
        }}
      >
        <img
          src={
            rate === 1
              ? "/images/listen_and_choose/tryAgain.png"
              : rate === 2
              ? "/images/listen_and_choose/niceTry.png"
              : rate === 3
              ? "/images/listen_and_choose/goodJob.png"
              : "/images/listen_and_choose/excellent.png"
          }
          alt="lỗi"
        ></img>
      </Box>
      <Typography
        sx={{
          position: "absolute",
          left: "58.2%",
          top: "73%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          fontWeight: 600,
          zIndex: 901,
        }}
      >
        {Math.floor(point)}
      </Typography>
      <Box onClick={handleReplay}>
        <img
          src="/images/listen_and_choose/btnRePlay.png"
          alt="point"
          style={{
            position: "absolute",
            left: "38.9%",
            top: "72.6%",
            transform: "translate(-50%, -50%)",
            zIndex: 901,
          }}
        ></img>
      </Box>
    </div>
  );
};

export default Finish;
