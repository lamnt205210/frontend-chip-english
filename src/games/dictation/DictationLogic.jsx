import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CharacterBox from "./CharacterBox";
import { openAudio } from "../../utils/audioUtils";
import "./animation.css";
const DictationLogic = ({ words, point, setPoint, setFinish }) => {
  //set bg

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/dictation/bg.png";
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
  }, []);
  // logic
  const pointPerQuestion = 100 / words.length;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [lengthWords, setLengthWords] = useState(
    words[currentWordIndex].word.length
  );
  const [values, setValues] = useState([]);
  const [status, setStatus] = useState("typing");

  const [visible, setVisible] = useState(true);
  const [checkAnswer, setCheckAnswer] = useState(false);
  console.log(values);
  const refs = useRef([]);

  useEffect(() => {
    openAudio(words[currentWordIndex].audioURL);
  }, [currentWordIndex]);
  useEffect(() => {
    // const lengthWords = words[currentWordIndex].word.length;
    setLengthWords(words[currentWordIndex].word.length);
    setValues(Array(lengthWords).fill(""));
    refs.current = Array(lengthWords)
      .fill()
      .map((_, i) => refs.current[i] || React.createRef());
  }, [currentWordIndex]);

  const handleChange = (value, index) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < values.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1].focus();
    }
  };
  const handleOnSubmit = () => {
    const result = values.join("").toLowerCase();
    const correct = words[currentWordIndex].word.toLowerCase();
    setStatus("review");
    if (result === correct) {
      setPoint(point + pointPerQuestion);
      openAudio("/audio/rightanswer.mp3");
      setCheckAnswer(true);
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    } else {
      openAudio("/audio/wronganswer.mp3");
      setCheckAnswer(false);
    }
  };
  const handleOnNext = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setStatus("typing");
      setVisible(true);
    }
  };
  const handleOnFinish = () => {
    setFinish(true);
  };

  console.log(status);
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ borderRadius: "0" }}
        width={1000}
        height={550}
      ></canvas>
      <Box>
        <img
          src="/images/dictation/mainboard.png"
          alt="lỗi"
          style={{
            position: "absolute",
            left: "11%",
            top: "6%",
            zIndex: 1,
          }}
        ></img>
      </Box>

      <Box>
        <img
          src="/images/dictation/point.png"
          alt="lỗi"
          style={{
            position: "absolute",
            right: "26%",
            top: "26%",
            transform: "translate(50%, -50%)",
            zIndex: 1,
          }}
        ></img>
        <Typography
          sx={{
            position: "absolute",
            right: "26%",
            top: "27%",
            color: "#f5b813f4",
            fontWeight: 600,
            fontSize: 20,
            zIndex: 1,
            transform: "translate(50%, -50%)",
          }}
        >
          {Math.floor(point)} ĐIỂM
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            position: "absolute",
            left: "25%",
            top: "25.5%",
            color: "#2f4858",
            fontWeight: 600,
            fontSize: 24,
            zIndex: 1,
            transform: "translate(-50%, -50%)",
          }}
        >
          {currentWordIndex + 1}/{words.length}
        </Typography>
        <Box>
          <img
            src={words[currentWordIndex].imageURL}
            alt="word des"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              cursor: "pointer",
              zIndex: 2,
              width: "300px",
              height: "165px",
              transform: "translate(-50%, -50%)",
              border: "3px solid #2f4858",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          ></img>
          <img
            src="/images/dictation/sound.png"
            alt="sound"
            style={{
              position: "absolute",
              left: "63%",
              top: "61%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              zIndex: 2,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => openAudio(words[currentWordIndex].audioURL)}
          ></img>
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "73%",
            cursor: "pointer",
            zIndex: 2,
            backgroundColor: "#137981",
            height: "42px",
            transform: "translate(-50%, -50%)",
            borderRadius: "5px",
            alignContent: "center",
          }}
        >
          {values.map((value, index) => (
            <CharacterBox
              key={index}
              value={value}
              index={index}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              correctValue={words[currentWordIndex].word[index]}
              inputRef={(el) => (refs.current[index] = el)}
              status={status}
            />
          ))}
        </Box>
        {status === "review" && visible && (
          <div>
            <Box
              sx={{
                position: "fixed",
                right: "45%",
                top: "50%",
                zIndex: 4,
                transform: "translate(50%, -50%)",
              }}
            >
              <img
                src={
                  checkAnswer === true
                    ? "/images/dictation/well.png"
                    : "/images/dictation/try.png"
                }
                alt="check"
                className="rotate-animation"
              ></img>
            </Box>
            <Box
              sx={{
                position: "fixed",
                right: "45%",
                top: "49%",
                zIndex: 5,
                transform: "translate(50%, -50%) rotate(-15deg)",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: 35,
                  fontStyle: "italic",
                }}
                className="rotate-animation"
              >
                {checkAnswer === true ? Math.floor(pointPerQuestion) : 0} ĐIỂM
              </Typography>
            </Box>
          </div>
        )}
        <Button
          sx={{
            position: "absolute",
            left: "51%",
            top: "85%",
            cursor: "pointer",
            zIndex: 2,
            color: "white",
            fontWeight: 600,
            fontSize: 18,
            fontFamily: "Cabin, sans-serif",
            padding: "0px 10px",
            backgroundColor: "#137981",
            height: "36px",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            alignContent: "center",
          }}
          onClick={
            status === "typing"
              ? handleOnSubmit
              : status === "review" && currentWordIndex !== words.length - 1
              ? handleOnNext
              : handleOnFinish
          }
        >
          {status === "typing"
            ? "SUBMIT"
            : status === "review" && currentWordIndex !== words.length - 1
            ? "NEXT"
            : "FINISH"}
        </Button>
      </Box>
    </div>
  );
};

export default DictationLogic;
