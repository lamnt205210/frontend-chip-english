import React, { useEffect, useRef, useState } from "react";

import { Box, Typography } from "@mui/material";

const DictationStart = ({ setPlay }) => {
  const [openGuide, setOpenGuide] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/dictation/bg.png"; // Update this path to the correct one
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
            src="/images/dictation/title.png"
            alt="lỗi"
            style={{
              position: "absolute",
              left: "11%",
              top: "6%",

              zIndex: 1,
            }}
          ></img>
          <img
            src="/images/dictation/btn-lestplay.png"
            alt="play"
            style={{
              position: "absolute",
              left: "34%",
              top: "72%",
              cursor: "pointer",
              zIndex: 2,
              width: "123px",
              height: "40px",
            }}
            onClick={() => setPlay(true)}
          ></img>
          <img
            src="/images/dictation/howto.png"
            alt="play"
            style={{
              position: "absolute",
              left: "52%",
              top: "72%",
              cursor: "pointer",
              width: "123px",
              height: "40px",
              zIndex: 1,
            }}
            onClick={() => setOpenGuide(true)}
          ></img>
        </Box>
      )}
      {openGuide && (
        <div>
          <img
            src="/images/dictation/bg_howtoplay.png"
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
            src="/images/dictation/back.png"
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
          ></img>
          <Typography
            sx={{
              position: "absolute",
              left: "18%",
              top: "28%",
              height: "114px",
              width: "588px",
              color: "white",
              zIndex: 5,
              fontSize: "24px",
              fontWeight: 600,
              fontStyle: "italic",
              cursor: "pointer",
            }}
          >
            Học sinh được xem 1 hình ảnh và âm thanh miêu tả từ vựng cùng số ô
            trống. Học sinh gõ đúng từ miêu tả để đạt điểm
          </Typography>
        </div>
      )}
    </div>
  );
};

export default DictationStart;
