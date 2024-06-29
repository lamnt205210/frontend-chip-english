import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Item from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as CourseService from "../services/CourseService";
export default function ClassCard(props) {
  const { name, description, imageURL, teachers, courseId } = props;
  const { data: semesterData } = useQuery({
    queryKey: ["semester"],
    queryFn: () => CourseService.getSemesterId(1),
  });
  // console.log("semesterData", semesterData);
  const semesterId = semesterData || "";
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 312, borderRadius: 2 }}>
      <CardMedia
        sx={{
          height: 192,
          borderTopLeftRadius: 8, // Applied border radius to only the top edges
          borderTopRightRadius: 8, // Applied border radius to only the top edges
        }}
        image={imageURL}
        title={name}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: 24,
              color: "#21BDC6",
              fontFamily: "Cabin, sans-serif",
            }}
          >
            {name}
          </Typography>
          <Typography
            align="center"
            sx={{
              fontSize: 14,
              fontFamily: "Cabin, sans-serif",
              color: "#515e5f",
              marginBottom: "10px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 3, // Limit to 5 lines
            }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 12,
              color: "#21BDC6",
              fontFamily: "Cabin, sans-serif",
              marginBottom: "10px",
            }}
          >
            Giáo viên giảng dạy
          </Typography>
          <Grid container spacing={0.5}>
            {teachers?.map((teacher, index) => (
              <React.Fragment key={index}>
                <Grid item xs={1} sx={{ alignContent: "center" }}>
                  <Avatar
                    sx={{ width: 24, height: 24 }}
                    alt={teacher.name}
                    src={teacher.imageURL}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: 11,
                      fontFamily: "Cabin, sans-serif",
                      paddingLeft: "10px",
                    }}
                  >
                    {teacher.name}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFA800",
              fontFamily: "SVN-Poppins, sans-serif",
              fontWeight: "bold",
              borderRadius: "12px",
              fontSize: "20px",
              marginRight: "10px",
              marginTop: "10px",
              color: "white",
              flex: 1,
            }}
            onClick={() => {
              navigate(`/course/${courseId}/semester/${semesterId}`);
            }}
          >
            Học ngay
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
