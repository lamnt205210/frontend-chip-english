import React, { useEffect, useRef, useState } from "react";
import ListenAndChooseDialogGuide from "./ListenAndChooseDialogGuide";

const ListenAndChooseStart = ({ setPlay }) => {
  const [openGuide, setOpenGuide] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/listen_and_choose/listen_and_choose_bg.png"; // Update this path to the correct one
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
      <div>
        <button
          style={{
            position: "absolute",
            left: "32%",
            top: "65%",
            padding: "10px 20px",
            fontSize: "20px",
            borderRadius: "50px",
            border: "none",
            backgroundColor: "#0bbba5",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setPlay(true)}
        >
          Let's Play
        </button>
        <button
          onClick={() => setOpenGuide(true)}
          style={{
            position: "absolute",
            left: "55%",
            top: "65%",
            padding: "10px 20px",
            fontSize: "20px",
            borderRadius: "50px",
            border: "none",
            backgroundColor: "#2f4858",
            color: "white",
            cursor: "pointer",
          }}
        >
          How To Play
        </button>
        {openGuide && (
          <ListenAndChooseDialogGuide setOpenGuide={setOpenGuide} />
        )}
      </div>
    </div>
  );
};

export default ListenAndChooseStart;
