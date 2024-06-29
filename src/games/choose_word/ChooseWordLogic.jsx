import React, { useEffect, useRef, useState } from "react";
import { openAudio } from "../../utils/audioUtils";
import { Box } from "@mui/material";
import PointBox from "./components/PointBox";
import TimeBox from "./components/TimeBox";
import QuestionNumberBox from "./components/QuestionNumberBox";
import ImageBox from "./components/ImageBox";
import AnswerBox from "./components/AnswerBox";

const ChooseWordLogic = ({ words, point, setPoint, setFinish }) => {
  const pointPerQuestion = 100 / words.length;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/choose_word/bg_play.jpg";
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [time, setTime] = useState(15);
  const [answer, setAnswer] = useState("");
  const currentWord = words[currentIndex];
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (answer !== "") {
      if (answer === currentWord.word) {
        openAudio("/audio/sentence_monkey/true.mp3");
        setPoint((prevPoint) => prevPoint + pointPerQuestion);
        setShowAnswer(true);
      } else {
        openAudio("/audio/sentence_monkey/wrong.mp3");
        setShowAnswer(true);
      }

      const timeout = setTimeout(() => {
        if (currentIndex < words.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setTime(15);
          setAnswer("");
          setShowAnswer(false);
        } else {
          setFinish(true);
        }
      }, 5000);

      return () => clearTimeout(timeout);
    } else if (time === 0 && answer === "") {
      openAudio("/audio/sentence_monkey/wrong.mp3");

      const timeout = setTimeout(() => {
        if (currentIndex < words.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setTime(15);
        } else {
          setFinish(true);
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }

    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [
    time,
    answer,
    currentIndex,
    words.length,
    setFinish,
    setPoint,
    pointPerQuestion,
    currentWord.word,
  ]);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ borderRadius: "0" }}
        width={1000}
        height={550}
      ></canvas>
      <Box
        style={{
          position: "absolute",
          top: "30%",
          left: "28%",
        }}
      >
        <PointBox point={point} />
      </Box>

      <Box
        style={{
          position: "absolute",
          top: "40%",
          left: "71.3%",
        }}
      >
        <TimeBox time={time} />
      </Box>
      <Box
        style={{
          position: "absolute",
          top: "20%",
          left: "70%",
        }}
      >
        <QuestionNumberBox
          numberQuestion={currentIndex + 1}
          total={words.length}
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          top: "10%",
          left: "49.5%",
          transform: "translate(-50%, 0%)",
        }}
      >
        <ImageBox word={currentWord} />
      </Box>
      <Box
        style={{
          position: "absolute",
          top: "55%",
          left: "8%",
          display: "flex",
          gap: "14px",
        }}
      >
        {currentWord.keyword.map((word, index) => (
          <AnswerBox
            key={index}
            word={word}
            setAnswer={setAnswer}
            answer={answer}
            showAnswer={showAnswer}
            keyword={currentWord.word}
          />
        ))}
      </Box>
    </div>
  );
};

export default ChooseWordLogic;
