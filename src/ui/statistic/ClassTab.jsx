import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";

const ClassTab = ({ classNum, setClassNum }) => {
  const handleChange = (event, newValue) => {
    setClassNum(newValue + 1);
  };

  return (
    <div
      style={{
        backgroundColor: "#e9f8f9",
        borderRadius: "10px",
        marginBottom: "30px",
      }}
    >
      <Tabs
        value={classNum - 1}
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

            color: "#000000", // Black text color for tabs
            backgroundColor: "#e9f8f9", // White background for tabs

            "&.Mui-selected": {
              color: "#ffffff", // White text color for selected tab
              backgroundColor: "#21bdc6", // Background color for selected tab
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px", // Ensuring selected tab has rounded corners
            },
          },
          "& .MuiTabs-indicator": {
            display: "none", // Remove the default indicator
          },
        }}
      >
        <Tab label="Lớp 1" />
        <Tab label="Lớp 2" />
        <Tab label="Lớp 3" />
        <Tab label="Lớp 4" />
        <Tab label="Lớp 5" />
      </Tabs>
    </div>
  );
};

export default ClassTab;
