import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "./styles.css"; // Nhớ import file CSS

const AnswerBox = ({ word, setAnswer, answer, showAnswer, keyword }) => {
  const [flipped, setFlipped] = useState(true);
  const [srcButton, setSrcButton] = useState(
    "/images/choose_word/btn_submit.png"
  );
  useEffect(() => {
    setFlipped(true);
    setTimeout(() => {
      setFlipped(false);
    }, 1200);
  }, [word]);
  useEffect(() => {
    console.log("showAnswer", showAnswer, word, answer, keyword);
    if (showAnswer === true) {
      setFlipped(true);
      if (word === keyword) {
        setSrcButton("/images/choose_word/btn_submit_true.png");
      } else if (word === answer) {
        setSrcButton("/images/choose_word/btn_submit_false.png");
      }
      const timer = setTimeout(() => {
        setFlipped(false);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setSrcButton("/images/choose_word/btn_submit.png");
    }
  }, [showAnswer, word, answer, keyword]);

  const handleOnClick = () => {
    setFlipped(true);
    setTimeout(() => {
      setFlipped(false);
    }, 1000);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <div
        className={`flip-card ${flipped ? "flipped" : ""}`}
        onClick={handleOnClick}
        style={{ pointerEvents: flipped ? "none" : "auto" }}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src="/images/choose_word/cardsheet.png"
              alt="score"
              style={{
                height: "160px",
                width: "260px",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="flip-card-back" style={{ position: "relative" }}>
            <img
              src="/images/choose_word/answer.png"
              alt="cau tra loi"
              style={{
                height: "160px",
                width: "260px",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {word}
            </Typography>
          </div>
        </div>
      </div>
      <img
        src={srcButton}
        alt="nut nop bai"
        style={{
          zIndex: 2,
          position: "absolute",
          top: "110%",
          left: "40%",
          pointerEvents: showAnswer ? "none" : "auto",
        }}
        onClick={() => {
          setAnswer(word);
        }}
      ></img>
    </Box>
  );
};
export default AnswerBox;
