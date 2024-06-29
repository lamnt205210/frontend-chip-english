import React, { useState } from "react";
import ChooseWordStart from "./ChooseWordStart";
import ChooseWordLogic from "./ChooseWordLogic";
import Finish from "../Finish";
import * as CourseService from "../../services/CourseService";
import { useQuery } from "@tanstack/react-query";
const ChooseWord = ({ game, lessonId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["lesson", game.materialId],
    queryFn: () => CourseService.getMaterialById(game.materialId),
  });
  const words = data?.words || [];
  // const words = [
  //   {
  //     word: "do exercise",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["do exers", "du exercize", "do exercise"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "read a book",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["reed a buk", "read book", "red a book"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "cook dinner",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["cuk diner", "cook diner", "cook dinner"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "go shopping",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["go shoping", "go shopping", "goshopping"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "ride a bike",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["ride bike", "ryde a bike", "ride a bike"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "play a game",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["play game", "pley a game", "play a game"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "watch a movie",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["wach a movie", "watch movie", "watch a movi"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "listen to music",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["listen to musik", "lisen to music", "listen to music"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "write a letter",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["rite a letter", "write letter", "rite letter"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "take a walk",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     keyword: ["take walk", "tak a walk", "take a walk"],
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  // ];
  const [play, setPlay] = useState(false);
  const [finish, setFinish] = useState(false);
  const [point, setPoint] = useState(0);
  const handleReplay = () => {
    setPlay(true);
    setFinish(false);
    setPoint(0);
  };
  return (
    <div>
      {!play && <ChooseWordStart words={words} setPlay={setPlay} />}
      {play && !finish && (
        <ChooseWordLogic
          words={words}
          setFinish={setFinish}
          point={point}
          setPoint={setPoint}
        />
      )}
      {finish && (
        <Finish
          point={point}
          handleReplay={handleReplay}
          gameId={game._id}
          lessonId={lessonId}
        />
      )}
    </div>
  );
};

export default ChooseWord;
