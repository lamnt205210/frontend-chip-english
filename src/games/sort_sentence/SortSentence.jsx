import React, { useState } from "react";
import SortSentenceStart from "./SortSentenceStart";
import SortSentenceLogic from "./SortSentenceLogic";
import Finish from "../Finish";
import * as CourseService from "../../services/CourseService";
import { useQuery } from "@tanstack/react-query";
const SortSentence = ({ game, lessonId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["lesson", game.materialId],
    queryFn: () => CourseService.getMaterialById(game.materialId),
  });
  const sentences = data?.words || [];
  // const sentences = [
  //   {
  //     sentence: "Hi, my name is Kayyyyyyyyyyyyy",
  //     imageURL: "https://i.ibb.co/Vwxpm9j/bike-v.png",
  //   },
  //   {
  //     sentence: "Hi, this is my friend",
  //     imageURL: "https://i.ibb.co/Vwxpm9j/bike-v.png",
  //   },
  //   {
  //     sentence: "Hi, this is my friend",
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
  if (!data) return null;
  return (
    <div>
      {!play && <SortSentenceStart setPlay={setPlay} />}
      {play && !finish && (
        <SortSentenceLogic
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

export default SortSentence;
