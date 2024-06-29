import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import * as CourseService from "../services/CourseService";
const SemesterTab = ({ semester, setSemester }) => {
  const [semesters, setSemesters] = useState([
    { name: "Học kì 1", id: null },
    { name: "Học kì 2", id: null },
  ]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchSemesterIds = async () => {
      try {
        const semester1Id = await CourseService.getSemesterId(1);
        const semester2Id = await CourseService.getSemesterId(2);

        setSemesters([
          { name: "Học kì 1", id: semester1Id },
          { name: "Học kì 2", id: semester2Id },
        ]);

        // Find the index of the current semesterId to set the selected tab correctly
        const currentSemesterIndex = semester1Id === semester ? 0 : 1;
        setValue(currentSemesterIndex);
      } catch (error) {
        console.error("Failed to fetch semester IDs", error);
      }
    };

    fetchSemesterIds();
  }, [semester]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSemester(semesters[newValue].id);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          backgroundColor: "#ffffff", // White background for the tabs container
          borderRadius: "8px", // Rounded corners for the tab container
          "& .MuiTab-root": {
            minWidth: "100px", // Each tab is ~100px wide
            padding: "10px 16px",
            fontSize: "16px",
            fontFamily: "Cabin, sans-serif",
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            border: "1px solid #727272", // Add border to all tabs
            color: "#000000", // Black text color for tabs
            backgroundColor: "#ffffff", // White background for tabs
            borderRadius: "8px", // Adding borderRadius to all tabs
            "&.Mui-selected": {
              color: "#ffffff", // White text color for selected tab
              backgroundColor: "#21bdc6", // Background color for selected tab
              boxShadow: "0 4px 8px rgba(175, 167, 167, 0.425)",
              borderRadius: "8px", // Ensuring selected tab has rounded corners
            },
          },
          "& .MuiTabs-indicator": {
            display: "none", // Remove the default indicator
          },
        }}
      >
        <Tab label="Học kì 1" />
        <Tab label="Học kì 2" />
      </Tabs>
    </div>
  );
};

export default SemesterTab;
