import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProgressService from "../services/ProgressService";
import { GetUserId } from "../games/GetUserId";
export default function UnitCard({ unit, courseId, semesterId }) {
  const { _id, englishName, vnName, imageURL } = unit;
  const unitId = _id;
  const userId = GetUserId();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["progress", userId, unitId],
    queryFn: () => ProgressService.getUnitProgress(userId, unitId),
  });
  console.log(data);
  const completedPercentage = data?.completed || 0;
  const navigate = useNavigate();
  // Fixed height for 2 lines of text
  const fixedHeight = {
    height: "3em", // Assuming line-height is 1.5em, 2 lines = 3em
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };

  return (
    <Card
      sx={{ maxWidth: 250, borderRadius: 2 }}
      onClick={() => {
        navigate(`/course/${courseId}/semester/${semesterId}/unit/${_id}`);
      }}
    >
      <Box
        sx={{
          height: 250,
          borderRadius: 2,
          overflow: "hidden",
          margin: "30px",
          backgroundImage: `url(${imageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          gutterBottom
          component="div"
          align="center"
          sx={{
            ...fixedHeight, // Applying the fixed height style
            fontWeight: "bold",
            fontSize: 18,
            marginTop: "-10px",
            lineHeight: "1.5em",
          }}
        >
          {englishName}
        </Typography>
        <Typography
          color="text.secondary"
          align="center"
          sx={{
            ...fixedHeight, // Applying the fixed height style
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Cabin, sans-serif",
            lineHeight: "1.3em",
            height: "2.6em",
          }}
        >
          {vnName}
        </Typography>
      </CardContent>
      <Box sx={{ margin: "0px 25px 30px" }} color="#21BDC6">
        <Typography align="left" sx={{ fontWeight: "bold" }}>
          {completedPercentage}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={completedPercentage}
          sx={{
            borderRadius: 2,
            height: 7,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#21BDC6",
            },
          }}
        />
      </Box>
    </Card>
  );
}
