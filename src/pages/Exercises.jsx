import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import Board from "../ui/Board";
import * as CourseService from "../services/CourseService";
import { useQuery } from "@tanstack/react-query";
const Exercises = ({ lessonId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, semesterId, unitId } = location.state || {};

  const { data, isError, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => CourseService.getLessonDetails(lessonId),
  });
  if (isLoading) {
    return null;
  }
  console.log("data", data);
  const videoURL = data?.videoURL || "";
  const games = data?.games || [];
  return (
    <div
      style={{
        backgroundColor: "#f5fcff",
        paddingTop: "28px",
        paddingBottom: "200px",
      }}
    >
      <Box
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#21bdc6",
          color: "#ffffff",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          cursor: "pointer",
          marginLeft: "98px",
          position: "fixed",
        }}
        onClick={() =>
          navigate(`/course/${courseId}/semester/${semesterId}/unit/${unitId}`)
        }
      >
        <ArrowBackIcon style={{ fontSize: "35px" }} />
      </Box>
      <Box
        sx={{
          border: "2px solid #f0f0f0",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "32px",
          margin: "70px 200px 0px 200px",
          // paddingBottom: "20px",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Board
          videoURL={videoURL}
          games={games}
          lessonId={lessonId}
          unitId={unitId}
        />
      </Box>
    </div>
  );
};

export default Exercises;
