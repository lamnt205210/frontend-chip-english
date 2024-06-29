import React, { useEffect, useRef, useState } from "react";
import MemoryDialogGuide from "./MemoryDialogGuide";
import Box from "@mui/material/Box";

const MemoryStart = ({ setPlay, setAnimation, setScenario }) => {
  const [openGuide, setOpenGuide] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/memory/background.png"; // Update this path to the correct one
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
      <Box
        sx={{
          position: "absolute",
          left: "10%",
          top: "9%",

          zIndex: 1,
        }}
      >
        <img src="/images/memory/intro.png" alt="lỗi"></img>
      </Box>
      <div>
        <img
          src="/images/memory/btn-lestplay.png"
          alt="play"
          style={{
            position: "absolute",
            left: "27%",
            top: "66%",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => {
            // setPlay(true);
            // setAnimation(true);
            setScenario("animation");
          }}
        ></img>
        <img
          src="/images/memory/howtoplay.png"
          alt="play"
          style={{
            position: "absolute",
            left: "52%",
            top: "66%",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => setOpenGuide(true)}
        ></img>

        {openGuide && <MemoryDialogGuide setOpenGuide={setOpenGuide} />}
      </div>
    </div>
  );
};

export default MemoryStart;
