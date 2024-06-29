import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as ProgressService from "../../services/ProgressService";

const RankingBoard = ({ user }) => {
  const {
    data: rankingData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["ranking"],
    queryFn: () => ProgressService.getRanking(),
  });

  if (isLoading) {
    return null;
  }

  console.log(rankingData);

  return (
    <div style={{ margin: "50px" }}>
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            marginBottom: "20px",
            fontWeight: 600,
            fontSize: 24,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#21bdc6",
            color: "#000000b3",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          Bảng xếp hạng
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #ddd",
            fontWeight: 600,
          }}
        >
          <Typography
            sx={{ flex: 1, textAlign: "center", fontSize: 20, fontWeight: 700 }}
          >
            TT
          </Typography>
          <Typography sx={{ flex: 3, fontSize: 20, fontWeight: 700 }}>
            Họ và tên
          </Typography>
          <Typography sx={{ flex: 1, fontSize: 20, fontWeight: 700 }}>
            Điểm
          </Typography>
        </Box>
        {rankingData.map((item, index) => (
          <Box
            key={item._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              alignItems: "center",
              backgroundColor:
                user.userName === item.userName ? "#aed7ef" : "white",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index < 3 ? (
                <img
                  src={
                    index === 0
                      ? "/images/top-1.png"
                      : index === 1
                      ? "/images/top-2.png"
                      : "/images/top-3.png"
                  }
                  alt="medal"
                  style={{ width: "30px" }}
                />
              ) : (
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                  {index + 1}
                </Typography>
              )}
            </Box>
            <Typography sx={{ flex: 3, fontSize: 18, fontWeight: 500 }}>
              {item.userName}
            </Typography>
            <Typography
              sx={{
                flex: 1,
                color: "#00949c",
                fontWeight: 600,
                fontSize: 20,
                textAlign: "left",
              }}
            >
              {Math.floor(item.rankingPoint)}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default RankingBoard;
