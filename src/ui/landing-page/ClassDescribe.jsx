import React from "react";

import { Box, Typography, CardMedia, Card, CardContent } from "@mui/material";

const classes = [
  {
    image: "/images/landing_page/lop-1-ngang.png",
    title: "Lớp 1",
  },
  {
    image: "/images/landing_page/lop-2-ngang.png",
    title: "Lớp 2",
  },
  {
    image: "/images/landing_page/lop-3-ngang.png",
    title: "Lớp 3",
  },
  {
    image: "/images/landing_page/lop-4-ngang.png",
    title: "Lớp 4",
  },
  {
    image: "/images/landing_page/lop-5-ngang.png",
    title: "Lớp 5",
  },
];

const ClassDescribe = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={8}
      sx={{ backgroundColor: "#f5fcff" }}
    >
      <Typography variant="h4">Các khóa học từ lớp 1 đến lớp 5</Typography>

      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        mt={4}
        gap={4}
      >
        {classes.map((c) => (
          <ClassCard key={c.title} image={c.image} title={c.title} />
        ))}
      </Box>
    </Box>
  );
};

const ClassCard = ({ image, title }) => {
  return (
    <Card>
      <CardMedia sx={{ height: 170, width: 230 }} image={image} title={title} />
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Tiếng Anh {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClassDescribe;
