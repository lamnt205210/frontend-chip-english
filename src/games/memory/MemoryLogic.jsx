import { Typography } from "@mui/material";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { openAudio } from "../../utils/audioUtils";

const MemoryLogic = ({ words, setScenario, clickTimeRef }) => {
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
  const generateInitialCards = useMemo(() => {
    const generatedCards = [];
    words.forEach((wordObj, index) => {
      generatedCards.push({
        id: `word-${index}`,
        value: wordObj.word,
        audioURL: wordObj.audioURL,
        type: "word",
        flipped: false,
        matched: false,
      });
      generatedCards.push({
        id: `image-${index}`,
        value: wordObj.imageURL,
        audioURL: wordObj.audioURL,
        type: "image",
        flipped: false,
        matched: false,
      });
    });
    return generatedCards.sort(() => Math.random() - 0.5); // Shuffle cards
  }, [words]);

  useEffect(() => {
    // Set the initial state using the renamed function
    setCards(generateInitialCards);
  }, [generateInitialCards]); // Only update when generateInitialCards changes
  // useState
  const [cards, setCards] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const countRef = useRef(1);

  if (countRef.current === 4) {
    setScenario("finish");
  }

  useEffect(() => {
    if (flippedCount === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (
        (firstCard.type === "word" &&
          secondCard.type === "image" &&
          words.find(
            (wordObj) =>
              wordObj.word === firstCard.value &&
              wordObj.imageURL === secondCard.value
          )) ||
        (firstCard.type === "image" &&
          secondCard.type === "word" &&
          words.find(
            (wordObj) =>
              wordObj.word === secondCard.value &&
              wordObj.imageURL === firstCard.value
          ))
      ) {
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: true, matched: true }
              : card
          );
          setCards(updatedCards);
        }, 500);
        countRef.current += 1;
      } else {
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.flipped && !card.matched ? { ...card, flipped: false } : card
          );
          setCards(updatedCards);
        }, 500);
      }
      setFlippedCount(0);
      setFlippedCards([]);
    }
  }, [flippedCount, flippedCards, cards]);

  const handleCardClick = useCallback(
    (id) => {
      clickTimeRef.current += 1;
      openAudio("/audio/touch.mp3");
      openAudio(cards.find((card) => card.id === id).audioURL);
      const clickedCard = cards.find((card) => card.id === id);
      if (!clickedCard.flipped && flippedCount < 2) {
        setFlippedCount(flippedCount + 1);
        setFlippedCards([...flippedCards, clickedCard]);
        const updatedCards = cards.map((card) =>
          card.id === id ? { ...card, flipped: true } : card
        );
        setCards(updatedCards);
      }
    },
    [cards, flippedCount, flippedCards]
  );
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
      <Typography
        sx={{
          position: "absolute",
          left: "20%",
          top: "25%",
          transform: "translate(-50%, -50%)",
          fontSize: "22px",
          borderRadius: "15px",
          color: "#394b41",
          cursor: "pointer",

          fontWeight: 600,
          wordSpacing: "5px",
          zIndex: 3,
        }}
      >
        {/* {count <= 3 ? `Câu ${count}/3` : "Câu 3/3"} */}
      </Typography>
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
        {cards.map((card) => (
          <div
            key={card.id}
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
            onClick={() => handleCardClick(card.id)}
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

export default MemoryLogic;
