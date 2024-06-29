import React, { useEffect, useRef, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import "./styles.css";
import { openAudio } from "../../utils/audioUtils";

const ListenAndChooseLogic = ({
  words,
  pointPerQuestion,
  setFinish,
  point,
  setPoint,
}) => {
  const audioClick = "/audio/touch.mp3";
  //   const [point, setPoint] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [trueAnswer, setTrueAnswer] = useState(() => getRandomOneOrTwo());
  const [wrongAnswer, setWrongAnswer] = useState(() =>
    getRandomNumberExcluding(words.length - 1, wordIndex)
  );
  const [isClicked, setIsClicked] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  //   const [finish, setFinish] = useState(false);
  //
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/listen_and_choose/listen_and_choose_bg_main.png"; // Update this path to the correct one
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      // Vẽ các đối tượng game khác tại đây
    };

    // Thêm các sự kiện và logic game khác tại đây
  }, []);

  useEffect(() => {}, [isClicked]);
  useEffect(() => {}, [isReviewing]);
  useEffect(() => {
    openAudio(words[0].audioURL);
  }, []);
  function getRandomNumberExcluding(n, a) {
    let numbers = [];
    for (let i = 0; i <= n; i++) {
      if (i !== a) {
        numbers.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  }
  function getRandomOneOrTwo() {
    return Math.floor(Math.random() * 2) + 1;
  }

  const handleCheckAnswer = () => {
    setIsReviewing(true);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2000ms = 2 seconds

    if (isClicked === trueAnswer) {
      setPoint(point + pointPerQuestion);
      openAudio("/audio/rightanswer.mp3");
    } else {
      openAudio("/audio/wronganswer.mp3");
    }
  };
  const handleNextQuestion = () => {
    setIsReviewing(false);
    setWordIndex(wordIndex + 1);
    openAudio(words[wordIndex + 1].audioURL);
    setTrueAnswer(getRandomOneOrTwo());
    setWrongAnswer(getRandomNumberExcluding(words.length - 1, wordIndex + 1));
    setIsClicked(0);
    // if (wordIndex === 3) {
    //   setFinish(true);
    // }
  };
  const handleFinishGame = () => {
    setFinish(true);
  };
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ borderRadius: "0" }}
        width={1000}
        height={550}
      ></canvas>
      {isReviewing && isVisible && (
        <Box
          sx={{
            position: "absolute",
            left: "30%",
            top: "25%",

            zIndex: 900,
          }}
        >
          <img
            src={
              isClicked === trueAnswer
                ? "/images/listen_and_choose/well.png"
                : "/images/listen_and_choose/try.png"
            }
            alt="lỗi"
            className="rotate-animation"
          ></img>
        </Box>
      )}

      <div>
        <Typography
          sx={{
            position: "absolute",
            left: "12%",
            top: "5%",
            padding: "10px 200px",
            fontSize: "20px",
            borderRadius: "15px",
            backgroundColor: "#477288",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
            wordSpacing: "5px",
          }}
        >
          👉 Nghe và chọn tranh đúng 👈
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            right: "15%",
            top: "18%",
            padding: "5px 10px",
            fontSize: "16px",
            borderRadius: "20px",
            color: "#f69f3d",
            cursor: "pointer",
            backgroundColor: "#2f4858",
            fontWeight: 600,
            wordSpacing: "5px",
            zIndex: 300,
          }}
        >
          {Math.floor(point)}/100 ĐIỂM
        </Typography>

        <div>
          <Typography
            sx={{
              position: "absolute",
              left: "13%",
              top: "18%",

              fontSize: "22px",
              borderRadius: "15px",
              color: "#394b41",
              cursor: "pointer",

              fontWeight: 600,
              wordSpacing: "5px",
            }}
          >
            Câu {wordIndex + 1}/4
          </Typography>
          <Button
            sx={{
              position: "absolute",
              left: "41%",
              top: "20%",
              backgroundColor: "#21bdc6",
              height: "38px",
              padding: "0px",
              borderRadius: "8px",
            }}
            onClick={() => openAudio(words[wordIndex].audioURL)}
          >
            <VolumeUpOutlinedIcon
              fontSize="medium"
              sx={{
                backgroundColor: "#2f4858",
                color: "white",
                borderRadius: "8px",
                height: "100%",
                padding: "0 7px",
              }}
            />
            <Typography
              sx={{ padding: "0 10px", color: "white", fontWeight: 600 }}
            >
              CLICK TO LISTEN
            </Typography>
          </Button>
          <Box
            sx={{
              position: "absolute",
              left: "25%",
              top: "33%",
              display: "flex",
              gap: "36px",
            }}
          >
            {[1, 2].map((item, index) => (
              <Box
                key={index}
                sx={{
                  height: "220px",
                  width: "220px",
                  borderRadius: "8px",

                  backgroundColor: "white",
                  //   border: "2px solid #2f4858",
                  transition: "transform 0.3s", // Để có hiệu ứng mềm mại khi hover
                  transform:
                    !isReviewing && item === isClicked ? "scale(1.1)" : "none",
                  border:
                    !isReviewing && item === isClicked
                      ? "4px solid #f69f3d"
                      : isReviewing && item === trueAnswer
                      ? "4px solid #09e146"
                      : isReviewing && item !== trueAnswer
                      ? "4px solid #e70c0c"
                      : "2px solid #2f4858",
                  "&:hover": {
                    transform: "scale(1.1)", // Thay đổi kích thước khi hover
                  },
                  "&:not(:last-child)": {
                    marginRight: "20px", // Khoảng cách giữa các hộp
                  },
                  pointerEvents: isReviewing ? "none" : "auto", // Vô hiệu hóa click khi isReviewing
                  cursor: isReviewing ? "not-allowed" : "pointer", // Thay đổi con trỏ chuột khi isReviewing
                }}
                onClick={() => {
                  setIsClicked(item);
                  openAudio(audioClick);
                }}
              >
                <img
                  src={
                    item === trueAnswer
                      ? words[wordIndex].imageURL
                      : words[wrongAnswer].imageURL
                  }
                  alt="lỗi"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                ></img>
              </Box>
            ))}
          </Box>

          <button
            style={{
              position: "absolute",
              left: "51%",
              top: "82%",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "50px",
              border: "none",
              backgroundColor: "#2f4858",
              color: "white",
              cursor: "pointer",
              transform: "translate(-50%, -50%)",
            }}
            onClick={
              !isReviewing
                ? handleCheckAnswer
                : isReviewing && wordIndex !== 3
                ? handleNextQuestion
                : handleFinishGame
            }
          >
            {!isReviewing
              ? "SUBMIT"
              : isReviewing && wordIndex !== words.length - 1
              ? "NEXT"
              : "FINISH"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListenAndChooseLogic;
