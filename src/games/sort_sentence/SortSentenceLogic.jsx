import { Typography, Box } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { openAudio } from "../../utils/audioUtils";
export default function SortSentenceLogic({
  sentences,
  setFinish,
  point,
  setPoint,
}) {
  //setup background
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/sort_sentence/bg.png"; // Update this path to the correct one
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      // Load and draw the overlay image
      const overlay = new Image();
      overlay.src = "/images/sort_sentence/mainboard.png"; // Update this path to the correct one
      overlay.onload = () => {
        // Calculate center position for the overlay
        const overlayX = (canvas.width - overlay.width) / 2;
        const overlayY = (canvas.height - overlay.height) / 2;

        // Draw overlay image at the calculated position
        context.drawImage(
          overlay,
          overlayX,
          overlayY,
          overlay.width,
          overlay.height
        );
      };
    };
  }, []);

  //
  //useState
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [originalWords, setOriginalWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [visible, setVisible] = useState(true);

  const [status, setStatus] = useState("doing");
  const [srcButton, setSrcButton] = useState(
    "/images/sort_sentence/btn-submit.png"
  );
  //
  const pointPerQuestion = 100 / sentences.length;
  //useEffect
  useEffect(() => {
    const SortSentence = sentences[sentenceIndex].sentence;

    const words = SortSentence?.split(" ");
    const shuffledWords = shuffleArray(words).map((word, index) => ({
      word,
      visible: true,
      originalIndex: index,
    }));
    setOriginalWords(shuffledWords);
    setSelectedWords([]);
  }, [sentenceIndex]);

  // function
  const shuffleArray = (array) => {
    let shuffledArray = array?.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Handle  click
  const handleWordClick = (clickedWord) => {
    if (selectedWords.includes(clickedWord)) {
      // Remove from selectedWords and add back to originalWords at the original position
      setSelectedWords(selectedWords.filter((word) => word !== clickedWord));
      setOriginalWords(
        originalWords
          .map((wordObj) =>
            wordObj.word === clickedWord
              ? { ...wordObj, visible: true }
              : wordObj
          )
          .sort((a, b) => a.originalIndex - b.originalIndex)
      );
    } else {
      // Remove from originalWords and add to selectedWords
      setSelectedWords([...selectedWords, clickedWord.word]);
      setOriginalWords(
        originalWords.map((wordObj) =>
          wordObj.word === clickedWord.word
            ? { ...wordObj, visible: false }
            : wordObj
        )
      );
    }
  };
  //handleOnClick
  const handleOnSubmit = () => {
    if (status === "doing") {
      setStatus("review");
      const result = selectedWords.join(" ").toLowerCase();
      const correct = sentences[sentenceIndex].sentence.toLowerCase();
      if (result === correct) {
        setPoint(point + pointPerQuestion);
        openAudio("/audio/rightanswer.mp3");
        setCheckAnswer(true);
      } else {
        setCheckAnswer(false);
        openAudio("/audio/wronganswer.mp3");
        setSelectedWords([sentences[sentenceIndex].sentence]);
      }
      setTimeout(() => {
        setVisible(false);
      }, 1000);
      if (sentenceIndex === sentences.length - 1) {
        setSrcButton("/images/sort_sentence/btn-finish.png");
      } else {
        setSrcButton("/images/sort_sentence/btn-next.png");
      }
    } else {
      if (sentenceIndex < sentences.length - 1) {
        setSentenceIndex(sentenceIndex + 1);
        setSrcButton("/images/sort_sentence/btn-submit.png");
        setStatus("doing");
        setVisible(true);
      } else {
        setFinish(true);
      }
    }
  };
  //
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ borderRadius: "0" }}
        width={1000}
        height={550}
      ></canvas>
      <Typography
        sx={{
          position: "absolute",
          left: "25%",
          top: "25%",
          transform: "translate(-50%, -50%)",
          color: "#226d76s",
          fontSize: "22px",
          fontWeight: 600,
        }}
      >
        {sentenceIndex + 1} / {sentences.length}
      </Typography>

      <Box>
        <img
          src="/images/sort_sentence/point.png"
          alt="lỗi"
          style={{
            position: "absolute",
            right: "25%",
            top: "25.5%",
            transform: "translate(50%, -50%)",
            zIndex: 2,
          }}
        ></img>
        <Typography
          sx={{
            position: "absolute",
            right: "26%",
            top: "26.5%",
            color: "#f5b813f4",
            fontWeight: 600,
            fontSize: 20,
            zIndex: 2,
            transform: "translate(50%, -50%)",
          }}
        >
          {Math.floor(point)} ĐIỂM
        </Typography>
      </Box>
      <img
        src={sentences[sentenceIndex].imageURL}
        alt="word des"
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          cursor: "pointer",
          zIndex: 2,
          width: "300px",
          height: "165px",
          transform: "translate(-50%, -50%)",
          border: "3px solid #fffffff3",
          borderRadius: "10px",
          objectFit: "contain",
        }}
      ></img>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "65%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{ marginTop: "24px", height: "19px" }}>
          {originalWords.map((word, index) => (
            <button
              key={index}
              style={{
                borderRadius: "8px",
                backgroundColor: "white",
                border: "1px solid #ffffff",
                padding: "3px ",
                marginLeft: "7px",
                fontSize: "16px",
                visibility: word.visible ? "visible" : "hidden",
              }}
              onClick={() => handleWordClick(word)}
            >
              {word.word}
            </button>
          ))}
        </div>
        <Box
          sx={{
            borderRadius: "8px",
            backgroundColor: "#00506b",
            marginTop: "20px",
            padding: "8px 8px 10px 8px",
            height: "24px",
            width: "100%",
          }}
        >
          {selectedWords.map((word, index) => (
            <button
              key={index}
              style={{
                borderRadius: "8px",
                backgroundColor: "white",
                border: "1px solid #ffffff",
                padding: "3px ",
                marginLeft: "7px",
                fontSize: "16px",
              }}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </button>
          ))}
        </Box>
      </div>
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
      <img
        src={srcButton}
        alt="nop"
        style={{
          marginTop: "10px",
          width: "99px",
          height: "29px",
          position: "absolute",
          left: "50%",
          top: "80%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={handleOnSubmit}
      ></img>
    </div>
  );
}
