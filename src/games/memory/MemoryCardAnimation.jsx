import { Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
const MemoryCardAnimation = ({ words, setScenario }) => {
  //setup background
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const background = new Image();
    background.src = "/images/memory/background.png"; // Update this path to the correct one
    background.onload = () => {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  //setup cards
  const generateCards = () => {
    const cards = [];
    words.forEach((wordObj, index) => {
      cards.push({
        id: `word-${index}`,
        value: wordObj.word,
        type: "word",
        flipped: false,
        matched: false,
      });
      cards.push({
        id: `image-${index}`,
        value: wordObj.imageURL,
        type: "image",
        flipped: false,
        matched: false,
      });
    });
    return cards.sort(() => Math.random() - 0.5); // Shuffle cards
  };
  const [cards, setCards] = useState(generateCards());
  const [flipping, setFlipping] = useState(false);
  useEffect(() => {
    const updatedCards = cards.map((card) => ({ ...card, flipped: true }));
    setCards(updatedCards);
    setTimeout(() => {
      const updatedCards = cards.map((card) => ({ ...card, flipped: false }));
      setCards(updatedCards);
      setFlipping(true);
      setTimeout(() => {
        setScenario("logic");
      }, 3000);
    }, 2000);
  }, []);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ borderRadius: "0" }}
        width={1000}
        height={550}
      ></canvas>
      <img
        src="/images/memory/boardinsight.png"
        alt="play"
        style={{
          position: "absolute",
          left: "10%",
          top: "6%",
          cursor: "pointer",
          zIndex: 2,
        }}
      ></img>

      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "51%",
          top: "55%",
          flexWrap: "wrap",
          width: "500px",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={
              flipping && index === 0
                ? "card-animation-1"
                : flipping && index === 1
                ? "card-animation-2"
                : flipping && index === 2
                ? "card-animation-3"
                : flipping && index === 3
                ? "card-animation-4"
                : flipping && index === 4
                ? "card-animation-5"
                : flipping && index === 5
                ? "card-animation-6"
                : ""
            }
            style={{
              borderRadius: "10px",
              width: "130px",
              height: "130px",
              margin: "16px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              visibility: card.matched ? "hidden" : "visible",
              cursor: card.matched ? "default" : "pointer",
            }}
          >
            {card.flipped && !card.matched ? (
              card.type === "word" ? (
                <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                  {card.value}
                </Typography>
              ) : (
                <img
                  src={card.value}
                  alt="card"
                  style={{ width: "100%", height: "100%" }}
                />
              )
            ) : (
              <img
                src="/images/memory/card.png"
                alt="cover"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryCardAnimation;
