// CharacterBox.js
import React from "react";
import { TextField } from "@mui/material";

const CharacterBox = ({
  value,
  index,
  correctValue,
  onChange,
  onKeyDown,
  inputRef,
  status,
}) => {
  const displayValue = status === "review" ? correctValue.toUpperCase() : value;
  return (
    <TextField
      variant="outlined"
      inputRef={inputRef}
      inputProps={{
        maxLength: 1,
        style: {
          color: "white",
          textAlign: "center",
          fontSize: "24px",
          fontStyle: "italic",
          fontWeight: 600,
        },
        autoComplete: "off",
      }}
      value={displayValue}
      onChange={(e) => onChange(e.target.value, index)}
      onKeyDown={(e) => onKeyDown(e, index)}
      sx={{
        display: "inline-block",
        alignSelf: "center",
        margin: "5px 5px",
        padding: 0,
        width: "33px",
        height: "33px",
        backgroundColor: status === "review" ? "#850404" : "#1d99a3",
        borderRadius: "7px",
        "& .MuiInputBase-input": {
          padding: "3px 0",
          height: "33px",
          lineHeight: "33px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "transparent",
          },
          "&:hover fieldset": {
            borderColor: "transparent",
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
          },
        },
      }}
    />
  );
};

export default CharacterBox;
