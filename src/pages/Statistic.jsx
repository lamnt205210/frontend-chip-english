import React, { useEffect, useState } from "react";
import ClassTab from "../ui/statistic/ClassTab";
import InfoBox from "../ui/statistic/InfoBox";
import UserInfoBox from "../ui/statistic/UserInfoBox.jsx";
import RankingBoard from "../ui/statistic/RankingBoard.jsx";
import { GetUserId } from "../games/GetUserId.jsx";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import * as ProgressService from "../services/ProgressService";
const Statistic = () => {
  const [classNum, setClassNum] = useState(1);

  const userId = GetUserId();

  const {
    data: courseProgress,
    isError: errorCourseProgress,
    isLoading: loadingCourseProgress,
  } = useQuery({
    queryKey: ["classNum", classNum],
    queryFn: () => ProgressService.getCourseProgress(userId, classNum),
  });
  const {
    data: courseAve,
    isError: errorCourseAve,
    isLoading: loadingCourseAve,
  } = useQuery({
    queryKey: ["classAve", classNum],
    queryFn: () => ProgressService.getAverageScoreCourse(userId, classNum),
  });

  const user = useSelector((state) => state.user);
  return (
    <div style={{ backgroundColor: "#f5fcff", width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: "160px",
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: "20px",
          margin: "50px",
          padding: "20px",
          paddingLeft: "50px",
        }}
      >
        <UserInfoBox user={user} />
        <div>
          <ClassTab classNum={classNum} setClassNum={setClassNum} />
          <div style={{ display: "flex", gap: "55px" }}>
            <InfoBox
              title="Tiến độ học"
              srcImg="/images/chart.png"
              progress={courseProgress?.completed || 0}
              percentage={true}
            />
            <InfoBox
              title="Điểm trung bình"
              srcImg="/images/chart-2.png"
              percentage={false}
              progress={Math.floor(courseAve) || 0}
            />
          </div>
        </div>
      </div>

      <RankingBoard user={user} />
      <div style={{ height: "100px", backgroundColor: "#f5fcff" }}></div>
    </div>
  );
};

export default Statistic;
