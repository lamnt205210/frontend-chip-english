import React from "react";
import { Box, Avatar } from "@mui/material";

const UserInfoBox = ({ user }) => {
  return (
    <Box
      sx={{
        width: "280px",
        marginTop: "20px",
        paddingLeft: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        alt={user.userName}
        src={user.profilePicture}
        sx={{ width: 160, height: 160 }}
      />
      <Box
        sx={{
          color: "#00949c",
          fontSize: 30,
          fontWeight: 700,
          padding: "10px 0 0 2px",
        }}
      >
        {user.userName}
      </Box>
    </Box>
  );
};

export default UserInfoBox;
