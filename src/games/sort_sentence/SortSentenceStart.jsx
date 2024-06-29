import React, { useEffect, useRef, useState } from "react";

import { Box, Typography } from "@mui/material";

const SortSentenceStart = ({ setPlay }) => {
  const [openGuide, setOpenGuide] = useState(false);
  const canvasRef = useRef(null);
  const [srcPlay, setSrcPlay] = useState(
    "/images/sort_sentence/btn-lestplay.png"
  );
  const [srcHowToPlay, setSrcHowToPlay] = useState(
    "/images/sort_sentence/btn-howtoplay.png"
  );
  const [srcBack, setSrcBack] = useState("/images/sort_sentence/btn-back.png");
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/sort_sentence/bg.png"; // Update this path to the correct one
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
            src="/images/sort_sentence/title.png"
            alt="lỗi"
            style={{
              position: "absolute",
              left: "11%",
              top: "6%",

              zIndex: 1,
            }}
          ></img>
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
              setSrcPlay("/images/sort_sentence/btn-lestplay-hover.png")
            }
            onMouseLeave={() =>
              setSrcPlay("/images/sort_sentence/btn-lestplay.png")
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
              setSrcHowToPlay("/images/sort_sentence/btn-howtoplay-hover.png")
            }
            onMouseLeave={() =>
              setSrcHowToPlay("/images/sort_sentence/btn-howtoplay.png")
            }
          ></img>
        </Box>
      )}
      {openGuide && (
        <div>
          <img
            src="/images/sort_sentence/board.png"
            alt="play"
            style={{
              position: "absolute",
              left: "17%",
              top: "23%",
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
              left: "44%",
              top: "57%",
              width: "95px",
              height: "35px",
              cursor: "pointer",

              zIndex: 1,
            }}
            onClick={() => setOpenGuide(false)}
            onMouseEnter={() =>
              setSrcBack("/images/sort_sentence/btn-backhover.png")
            }
            onMouseLeave={() =>
              setSrcBack("/images/sort_sentence/btn-back.png")
            }
          ></img>
          <Typography
            sx={{
              position: "absolute",
              left: "18%",

              top: "28%",
              height: "114px",
              width: "555px",
              color: "white",
              zIndex: 5,
              fontSize: "24px",
              fontWeight: 550,
              fontStyle: "italic",

              cursor: "pointer",
              padding: "20px",
            }}
          >
            Dựa vào các từ cho trước theo gợi ý, học sinh sắp xếp lại câu đúng
            để đạt điểm
          </Typography>
        </div>
      )}
    </div>
  );
};

export default SortSentenceStart;
