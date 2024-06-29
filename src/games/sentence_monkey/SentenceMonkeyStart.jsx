import React, { useEffect, useRef, useState } from "react";
import { openAudio } from "../../utils/audioUtils";
import { Box, Typography } from "@mui/material";

const SentenceMonkeyStart = ({ setPlay }) => {
  const [openGuide, setOpenGuide] = useState(false);
  const canvasRef = useRef(null);
  const [srcPlay, setSrcPlay] = useState(
    "/images/sentence_monkey/btn-play.png"
  );
  const [srcHowToPlay, setSrcHowToPlay] = useState(
    "/images/sentence_monkey/btn-howtoplay.png"
  );
  const [srcBack, setSrcBack] = useState(
    "/images/sentence_monkey/btn-back.png"
  );
  useEffect(() => {
    openAudio("/audio/monkey-game-start.mp3");
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
      {!openGuide && (
        <Box>
          <img
            src={srcPlay}
            alt="play"
            style={{
              position: "absolute",
              left: "35%",
              top: "62%",
              cursor: "pointer",
              zIndex: 2,
              width: "123px",
              height: "40px",
            }}
            onClick={() => setPlay(true)}
            onMouseEnter={() =>
              setSrcPlay("/images/sentence_monkey/btn-play-hover.png")
            }
            onMouseLeave={() =>
              setSrcPlay("/images/sentence_monkey/btn-play.png")
            }
          ></img>
          <img
            src={srcHowToPlay}
            alt="play"
            style={{
              position: "absolute",
              left: "53%",
              top: "62%",
              cursor: "pointer",
              width: "123px",
              height: "40px",
              zIndex: 1,
            }}
            onClick={() => setOpenGuide(true)}
            onMouseEnter={() =>
              setSrcHowToPlay("/images/sentence_monkey/btn-howtoplay-hover.png")
            }
            onMouseLeave={() =>
              setSrcHowToPlay("/images/sentence_monkey/btn-howtoplay.png")
            }
          ></img>
        </Box>
      )}
      {openGuide && (
        <div>
          <img
            src="/images/sentence_monkey/helpboard.png"
            alt="play"
            style={{
              position: "absolute",
              left: "20%",
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
              left: "48%",
              top: "70%",
              width: "95px",
              height: "35px",
              cursor: "pointer",

              zIndex: 1,
            }}
            onClick={() => setOpenGuide(false)}
            onMouseEnter={() =>
              setSrcBack("/images/sentence_monkey/btn-back-hover.png")
            }
            onMouseLeave={() =>
              setSrcBack("/images/sentence_monkey/btn-back.png")
            }
          ></img>
          <Typography
            sx={{
              position: "absolute",
              left: "20%",

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
            Có 1 hình ảnh được miêu tả bằng 1 câu văn bị khuyết chữ. Học sinh
            kéo, thả các từ bị thiếu vào câu để hoàn thành câu hỏi.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default SentenceMonkeyStart;
