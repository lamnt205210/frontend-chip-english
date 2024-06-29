import React from "react";
import { Typography } from "@mui/material";
const ListenAndChooseDialogGuide = (props) => {
  const { setOpenGuide } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "15%",
        left: "8%",
        width: "80%",
        padding: "20px",
        backgroundColor: "#2fb6b2",
        borderRadius: "20px",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          fontStyle: "italic",
          color: "#fbf9ec",
          fontFamily: "Cabin, sans-serif",
          fontWeight: "bold",
          margin: "20px",
        }}
      >
        Hướng dẫn
      </Typography>

      <Typography
        sx={{
          fontSize: 30,
          fontStyle: "italic",
          color: "#fbf9ec",
          fontFamily: "Cabin, sans-serif",
        }}
      >
        Học sinh được nghe file audio và hình ảnh, học sinh chọn tranh phù hợp
        với audio để đạt điểm.
      </Typography>
      <button
        onClick={() => {
          setOpenGuide(false);
        }}
        style={{
          padding: "10px 20px",
          fontSize: "26px",
          borderRadius: "50px",
          border: "none",
          backgroundColor: "#e3f7d5",
          color: "#125564",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "60px",
          marginBottom: "60px",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ListenAndChooseDialogGuide;
