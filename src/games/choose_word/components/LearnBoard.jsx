import React, { useState } from "react";
import { Box } from "@mui/material";
import BoxWord from "./BoxWord";

const LearnBoard = ({ words, setOpenLearn }) => {
  const [urlBack, setUrlBack] = useState(
    "/images/choose_word/btn_backsmall.png"
  );

  return (
    <div>
      <img
        src="/images/choose_word/boardguide.jpg"
        alt="play"
        style={{
          position: "absolute",
          zIndex: 2,
          width: "100%", // Adjusted to fit the container
          height: "100%", // Adjusted to fit the container
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: "15%",
          left: "20%", // Shifted slightly to the left to allow more space on the right
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            width: "600px", // Increased width
            height: "380px", // Slightly increased height
            display: "flex",
            flexWrap: "wrap",
            overflow: "auto",
            backgroundColor: "#53b9c5", // Added for better visibility
            borderRadius: "8px", // Added for rounded corners
            padding: "10px", // Added padding for inner spacing
            gap: "30px", // Increased gap between BoxWord components
          }}
        >
          {words.map((word, index) => (
            <Box
              key={index}
              sx={{
                width: "calc(100% / 3 - 20px)",
                boxSizing: "border-box",
              }}
            >
              <BoxWord word={word} />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Positioned to the right
            marginTop: "25px",
          }}
        >
          <img
            src={urlBack}
            alt="button back"
            style={{ borderRadius: "18px" }}
            onMouseEnter={() =>
              setUrlBack("/images/choose_word/btn_backsmall_hover.png")
            }
            onMouseLeave={() =>
              setUrlBack("/images/choose_word/btn_backsmall.png")
            }
            onClick={() => setOpenLearn(false)}
          />
        </Box>
      </Box>
    </div>
  );
};

export default LearnBoard;
