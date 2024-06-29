import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProgressService from "../services/ProgressService";
import { GetUserId } from "../games/GetUserId";

export default function ExerciseCategory({
  exercise,
  courseId,
  semesterId,
  unitId,
}) {
  const navigate = useNavigate();
  const lessonId = exercise._id;
  const userId = GetUserId();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["progress", userId, lessonId],
    queryFn: () => ProgressService.getLessonProgress(userId, lessonId),
  });
  const completedPercentage = data?.completed || 0;
  const maxScore = data?.maximumScore || 0;
  const totalScore = data?.totalScore || 0;
  return (
    <div
      style={{
        border: "2px solid #f0f0f0",
        boxShadow: "0px 2px 2px rgba(83, 83, 123, 0.25)",
        borderRadius: "20px",
        padding: "16px",
        margin: "15px",
        backgroundColor: "white",
      }}
      onClick={() => {
        navigate(`/lesson/${exercise._id}`, {
          state: { courseId, semesterId, unitId },
        });
      }}
    >
      <Grid container alignItems="center" gridColumn={4}>
        <Grid item xs={1}>
          <img
            src={
              exercise.category === "Từ vựng"
                ? "/images/vocab-icon.png"
                : exercise.category === "Ngữ âm"
                ? "/images/phonetic-icon.png"
                : "/images/grammar-icon.png"
            }
            alt="vocab-icon"
            style={{ maxWidth: "60px", height: "auto" }}
          />
        </Grid>
        <Grid item xs={7}>
          <Typography
            sx={{
              fontWeight: 550,
              fontSize: "22px",
              color: "#292d32",
            }}
          >
            {exercise.category}: {exercise.name}
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography
            sx={{
              color: "#21BDC6",
              fontWeight: 700,
              fontSize: "22px",
              lineHeight: "32px",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            {Math.floor(totalScore)}/{maxScore} điểm
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            sx={{
              color: "#0000009b",
              fontWeight: 600,
              fontSize: "22px",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            • {completedPercentage}%
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
