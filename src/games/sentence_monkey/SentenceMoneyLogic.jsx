import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { openAudio } from "../../utils/audioUtils";
const SentenceMoneyLogic = ({ sentences, setFinish, point, setPoint }) => {
  // useStates
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [monkeyImg, setMonkeyImg] = useState(
    "/images/sentence_monkey/monkey-doing.png"
  );
  const [buttonURL, setButtonURL] = useState(
    "/images/sentence_monkey/btn-submit.png"
  );
  const [status, setStatus] = useState("doing");

  const currentSentence = sentences[sentenceIndex];

  // Setup background
  const pointPerQuestion = 100 / sentences.length;
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/sentence_monkey/bg_main.png";
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      const overlay = new Image();
      overlay.src = "/images/sentence_monkey/bg_cauhoi.png";
      overlay.onload = () => {
        context.drawImage(overlay, 22, 254, 938, 150);
      };
      const boxMonkey = new Image();
      boxMonkey.src = "/images/sentence_monkey/box_monkey.png";
      boxMonkey.onload = () => {
        context.drawImage(boxMonkey, 22, 36, 350, 198);
        const monkey = new Image();
        monkey.src = monkeyImg;
        monkey.onload = () => {
          context.drawImage(monkey, 22, 36, 350, 198);
        };
      };
      const boxCo = new Image();
      boxCo.src = "/images/sentence_monkey/box_conco.png";
      boxCo.onload = () => {
        context.drawImage(boxCo, 608, 36, 350, 198);
        //
        // const sentenceImage = new Image();
        // sentenceImage.src = currentSentence.imageURL;
        // sentenceImage.onload = () => {
        //   // Calculate aspect ratio
        //   const aspectRatio = sentenceImage.width / sentenceImage.height;
        //   let newWidth = 350;
        //   let newHeight = 198;

        //   // Adjust dimensions to maintain aspect ratio
        //   if (aspectRatio > 1) {
        //     newHeight = newWidth / aspectRatio;
        //   } else {
        //     newWidth = newHeight * aspectRatio;
        //   }

        //   // Center the image in the box
        //   const offsetX = 608 + (350 - newWidth) / 2;
        //   const offsetY = 36 + (198 - newHeight) / 2;

        //   context.drawImage(
        //     sentenceImage,
        //     offsetX,
        //     offsetY,
        //     newWidth,
        //     newHeight
        //   );
        // };
        //
      };
    };
  }, [sentenceIndex, monkeyImg, currentSentence.imageURL]);

  const handleDrop = (item) => {
    setSelectedWord(item);
  };

  const handleReset = () => {
    setSelectedWord(null);
  };
  const handleOnClickButton = () => {
    if (status === "doing") {
      if (selectedWord) {
        const isCorrect = selectedWord.word === currentSentence.key;
        if (isCorrect) {
          setPoint(point + pointPerQuestion);
          setMonkeyImg("/images/sentence_monkey/monkey_happy.png");
          openAudio("/audio/sentence_monkey/true.mp3");
        } else {
          setMonkeyImg("/images/sentence_monkey/monkey_sad.png");
          openAudio("/audio/sentence_monkey/wrong.mp3");
        }
        setSelectedWord({
          word: currentSentence.key,
          imageSrc: "/images/sentence_monkey/box_goiy3.png",
        });
        setStatus("reviewing");
        setButtonURL("/images/sentence_monkey/btn-next.png");
      }
    } else {
      if (status === "reviewing") {
        if (sentenceIndex === sentences.length - 1) {
          setFinish(true);
        } else {
          setSentenceIndex(sentenceIndex + 1);
          setSelectedWord(null);
          setMonkeyImg("/images/sentence_monkey/monkey-doing.png");
          setStatus("doing");
          setButtonURL("/images/sentence_monkey/btn-submit.png");
        }
      } else {
        setSelectedWord(null);
        setMonkeyImg("/images/sentence_monkey/monkey.png");
        setStatus("doing");
      }
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: "relative", textAlign: "center" }}>
        <canvas
          ref={canvasRef}
          style={{ borderRadius: "0" }}
          width={980}
          height={550}
        ></canvas>
        <Box sx={{ height: "22px", width: "36px" }}>
          <img
            src={currentSentence.imageURL}
            style={{
              width: "166px",
              height: "350px",
              position: "absolute",
              zIndex: 3,
              top: "23.5%",
              left: "80%",
              transform: "translate(-50%, -50%)",
              objectFit: "contain",
            }}
            alt="anh cau hoi"
          ></img>
        </Box>
        <Box>
          <img
            src={buttonURL}
            alt="monkey"
            style={{
              position: "absolute",
              left: "50%",
              top: "28%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
            onClick={handleOnClickButton}
            onMouseEnter={() => {
              if (status === "doing")
                setButtonURL("/images/sentence_monkey/btn-submit-hover.png");
            }}
            onMouseLeave={() => {
              if (status === "doing")
                setButtonURL("/images/sentence_monkey/btn-submit.png");
            }}
          ></img>
        </Box>
        <Box>
          <img
            src="/images/sentence_monkey/box_diem.png"
            alt="lỗi"
            style={{
              position: "absolute",
              left: "45%",
              top: "10%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          ></img>
          <Typography
            sx={{
              position: "absolute",
              left: "45%",
              top: "10%",
              color: "#f5b813f4",
              fontWeight: 600,
              fontSize: 20,
              zIndex: 2,
              transform: "translate(-50%, -50%)",
            }}
          >
            {Math.floor(point)} ĐIỂM
          </Typography>
        </Box>
        <Typography
          sx={{
            position: "absolute",
            left: "58.7%",
            top: "10%",
            color: "white",
            fontWeight: 600,
            fontSize: 20,
            zIndex: 2,
            transform: "translate(-50%, -50%)",
          }}
        >
          {sentenceIndex + 1}/{sentences.length}
        </Typography>
        <Box>
          {currentSentence.keyword.map((word, index) => (
            <DraggableWord
              key={index}
              word={word}
              imageSrc={`/images/sentence_monkey/box_goiy${index}.png`}
              top={`${index < 3 ? 53 : 65}%`}
              left={`${index < 3 ? 20 + index * 30 : 35 + (index - 3) * 30}%`}
            />
          ))}
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "84%", // Adjusted for more spacing
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: "white",
              marginRight: 2,
            }}
          >
            {currentSentence.ls}
          </Typography>
          <DropTarget onDrop={handleDrop} onReset={handleReset}>
            {selectedWord && (
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <img
                  src={selectedWord.imageSrc}
                  alt="dropped"
                  style={{ width: "128px", height: "35px" }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {selectedWord.word}
                </Typography>
              </Box>
            )}
          </DropTarget>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: "white",
              marginLeft: 2,
            }}
          >
            {currentSentence.rs}
          </Typography>
        </Box>
      </div>
    </DndProvider>
  );
};

const DraggableWord = ({ word, imageSrc, top, left }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "WORD",
    item: { word, imageSrc },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={dragRef}
      sx={{
        position: "absolute",
        top: top,
        left: left,
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img src={imageSrc} alt="dap an" />
      <Typography
        sx={{
          color: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: 24,
          fontWeight: 600,
          transform: "translate(-50%, -50%)",
        }}
      >
        {word}
      </Typography>
    </Box>
  );
};

const DropTarget = ({ children, onDrop, onReset }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "WORD",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      ref={dropRef}
      sx={{
        position: "relative",
        display: "inline-block",
        width: "128px",
        height: "35px",
        borderRadius: "5px",
        cursor: children ? "pointer" : "default",
      }}
      onClick={onReset}
    >
      <img
        src="/images/sentence_monkey/bg_cauhoi.png"
        alt="dap an"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          position: "absolute",
          top: "-3%",
          left: "0%",
        }} // Adjusted position to move down slightly
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", // To prevent dragging of text
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SentenceMoneyLogic;
