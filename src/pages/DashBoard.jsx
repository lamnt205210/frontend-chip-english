import React, { useEffect } from "react";
import ClassCard from "../ui/ClassCard";
import Box from "@mui/material/Box";
import { useMutationHook } from "../hooks/useMutationHook";
import * as CourseService from "../services/CourseService";
const DashBoard = () => {
  // Get the URL parameters
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");

  // If access_token is present, save it to localStorage
  if (accessToken) {
    localStorage.setItem("access_token", JSON.stringify(accessToken));

    // Remove the access_token from the URL by updating the browser history
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }

  const mutation = useMutationHook((data) => CourseService.getAllCourses());
  const { data, error, isPending, isSuccess } = mutation;
  useEffect(() => {
    mutation.mutate();
  }, []);
  console.log("data", data);
  return (
    <div style={{ marginLeft: "50px" }}>
      <h1 style={{ color: "#0f575a", paddingLeft: "34px" }}>
        Các khóa học tiếng Anh
      </h1>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap={2}
        padding={2}
      >
        {data?.courses?.map((course) => (
          <Box
            key={course._id}
            sx={{
              boxSizing: "border-box", // Include padding and border in the element's total width and height
              padding: 2, // Add some padding
            }}
          >
            <ClassCard
              name={course.name}
              description={course.description}
              imageURL={course.imageURL}
              id={course.id}
              teachers={course.teacher}
              courseId={course._id}
              courseNumber={course.courseNumber}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default DashBoard;
