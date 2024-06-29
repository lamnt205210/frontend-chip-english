import React, { useState } from "react";
import ListenAndChooseStart from "./ListenAndChooseStart";
import ListenAndChooseLogic from "./ListenAndChooseLogic";
import Finish from "../Finish";
import * as CourseService from "../../services/CourseService";
import { useQuery } from "@tanstack/react-query";
import { openAudio } from "../../utils/audioUtils";

//
import { GetUserId } from "../GetUserId";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as ProgressService from "../../services/ProgressService";

//
const ListenAndChoose = ({ game, lessonId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["lesson", game.materialId],
    queryFn: () => CourseService.getMaterialById(game.materialId),
  });
  const words = data?.words || [];

  const pointPerQuestion = 100 / words.length;
  const [play, setPlay] = useState(false);
  const [finish, setFinish] = useState(false);
  const [point, setPoint] = useState(0);
  //
  const handleReplay = () => {
    openAudio("/audio/touch.mp3");
    setPlay(true);
    setFinish(false);
    setPoint(0);
  };
  return (
    <div>
      {!play && <ListenAndChooseStart setPlay={setPlay} />}
      {!finish && play && (
        <ListenAndChooseLogic
          words={words}
          pointPerQuestion={pointPerQuestion}
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

export default ListenAndChoose;
