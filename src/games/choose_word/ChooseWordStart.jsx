import React, { useEffect, useRef, useState } from "react";
import { openAudio } from "../../utils/audioUtils";
import { Box, Typography } from "@mui/material";
import LearnBoard from "./components/LearnBoard";

const ChooseWordStart = ({ setPlay, words }) => {
  const [openGuide, setOpenGuide] = useState(false);
  const [openLearn, setOpenLearn] = useState(false);
  const canvasRef = useRef(null);
  const [srcPlay, setSrcPlay] = useState(
    "/images/choose_word/btn_letsplay.png"
  );
  const [srcHowToPlay, setSrcHowToPlay] = useState(
    "/images/choose_word/btn_howtoplay.png"
  );
  const [srcLearn, setSrcLearn] = useState(
    "/images/choose_word/btn_letslearn.png"
  );
  const [srcBack, setSrcBack] = useState("/images/choose_word/btn_backbig.png");
  useEffect(() => {
    openAudio("/audio/monkey-game-start.mp3");
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/choose_word/bg.jpg"; // Update this path to the correct one
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

      <Box>
        <img
          src={srcPlay}
          alt="play"
          style={{
            position: "absolute",
            left: "25%",
            top: "68%",
            cursor: "pointer",
            zIndex: 1,
            width: "123px",
            height: "40px",
          }}
          onClick={() => setPlay(true)}
          onMouseEnter={() =>
            setSrcPlay("/images/choose_word/btn_letsplay_hover.png")
          }
          onMouseLeave={() =>
            setSrcPlay("/images/choose_word/btn_letsplay.png")
          }
        ></img>
        <img
          src={srcHowToPlay}
          alt="play"
          style={{
            position: "absolute",
            left: "65%",
            top: "68%",
            cursor: "pointer",
            width: "123px",
            height: "40px",
            zIndex: 1,
          }}
          onClick={() => setOpenGuide(true)}
          onMouseEnter={() =>
            setSrcHowToPlay("/images/choose_word/btn_howtoplay_hover.png")
          }
          onMouseLeave={() =>
            setSrcHowToPlay("/images/choose_word/btn_howtoplay.png")
          }
        ></img>
        <img
          src={srcLearn}
          alt="play"
          style={{
            position: "absolute",
            left: "45%",
            top: "68%",
            cursor: "pointer",
            width: "123px",
            height: "40px",
            zIndex: 1,
          }}
          onClick={() => setOpenLearn(true)}
          onMouseEnter={() =>
            setSrcLearn("/images/choose_word/btn_letslearn_hover.png")
          }
          onMouseLeave={() =>
            setSrcLearn("/images/choose_word/btn_letslearn.png")
          }
        ></img>
      </Box>

      {openGuide && (
        <div>
          <img
            src="/images/choose_word/boardguide.jpg"
            alt="play"
            style={{
              position: "absolute",
              left: "18%",
              top: "10%",
              cursor: "pointer",

              zIndex: 1,
            }}
            onClick={() => setOpenGuide(true)}
          ></img>
          <img
            src={srcBack}
            alt="play"
            style={{
              position: "absolute",
              left: "44.5%",
              top: "70%",
              width: "95px",
              height: "35px",
              cursor: "pointer",

              zIndex: 1,
            }}
            onClick={() => setOpenGuide(false)}
            onMouseEnter={() =>
              setSrcBack("/images/choose_word/btn_backbig_hover.png")
            }
            onMouseLeave={() =>
              setSrcBack("/images/choose_word/btn_backbig.png")
            }
          ></img>
          <Typography
            sx={{
              position: "absolute",
              left: "18.5%",
              top: "25%",
              height: "114px",
              width: "555px",
              color: "white",
              zIndex: 5,
              fontSize: "24px",
              fontWeight: 550,
              fontStyle: "italic",
              lineHeight: "1.6",
              cursor: "pointer",
              padding: "20px",
              wordSpacing: "0.1em",
            }}
          >
            Cách chơi: Người chơi được nghe 1 file âm thanh và hình ảnh miêu tả
            1 từ vựng. Có 3 phương án trả lời, 1 phương án đúng và 2 phương án
            viết sai chính tả từ vựng đó.
          </Typography>
        </div>
      )}
      {openLearn && (
        <div style={{ position: "absolute", left: "18%", top: "8%" }}>
          <LearnBoard words={words} setOpenLearn={setOpenLearn} />
        </div>
      )}
    </div>
  );
};

export default ChooseWordStart;
