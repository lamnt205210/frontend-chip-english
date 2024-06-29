import React, { useState } from "react";
import DictationStart from "./DictationStart";
import DictationLogic from "./DictationLogic";
import Finish from "../Finish";
import * as CourseService from "../../services/CourseService";
import { useQuery } from "@tanstack/react-query";
const Dictation = ({ game, lessonId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["lesson", game.materialId],
    queryFn: () => CourseService.getMaterialById(game.materialId),
  });
  const words = data?.words || [];
  // const words = [
  //   {
  //     word: "ball",
  //     imageURL: "https://i.ibb.co/6sM22FZ/ball-v.png",
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_ball%20(1).mp3",
  //   },
  //   {
  //     word: "Bill",
  //     imageURL: "https://i.ibb.co/vYnmnQz/bill-v.png",
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bill.mp3",
  //   },
  //   {
  //     word: "book",
  //     imageURL: "https://i.ibb.co/0q8xPr5/book-v.png",
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_book.mp3",
  //   },
  //   {
  //     word: "bike",
  //     imageURL: "https://i.ibb.co/Vwxpm9j/bike-v.png",
  //     audioURL:
  //       "https://raw.githubusercontent.com/lamnt205210/audio-hosting/main/uploads/g1u1l1_bike.mp3",
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
      {!play && <DictationStart setPlay={setPlay} />}
      {play && !finish && (
        <DictationLogic
          words={words}
          point={point}
          setPoint={setPoint}
          setFinish={setFinish}
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

export default Dictation;
