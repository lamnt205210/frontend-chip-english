import React, { useState } from "react";
import SentenceMonkeyLogic from "./SentenceMoneyLogic";
import Finish from "../Finish";
import SentenceMonkeyStart from "./SentenceMonkeyStart";
import * as CourseService from "../../services/CourseService";
import { useQuery } from "@tanstack/react-query";
const SentenceMonkey = ({ game, lessonId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["lesson", game.materialId],
    queryFn: () => CourseService.getMaterialById(game.materialId),
  });
  const sentences = data?.words || [];
  // const sentences = [
  //   {
  //     ls: "Hi ",
  //     rs: " name is Kay",
  //     keyword: ["my", "name", "your", "father", "hi"],
  //     key: "my",
  //     sentence: "Hi my name is Kay",
  //     imageURL: "https://i.ibb.co/Vwxpm9j/bike-v.png",
  //   },
  //   {
  //     ls: "What ",
  //     rs: " is it?",
  //     keyword: ["time", "name", "your", "father"],
  //     key: "time",
  //     sentence: "Hi my name is Kay",
  //     imageURL: "https://i.ibb.co/Vwxpm9j/bike-v.png",
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
      {!play && <SentenceMonkeyStart setPlay={setPlay} />}
      {play && !finish && (
        <SentenceMonkeyLogic
          sentences={sentences}
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

export default SentenceMonkey;
