import React from "react";
import HeaderLandingPage from "../ui/HeaderLandingPage";
import SignUp from "./SignUp";
import Login from "./Login";
import ClassDescribe from "../ui/landing-page/ClassDescribe";
import { Typography, Box, Button } from "@mui/material";
import { Footer } from "../ui/landing-page/Footer";
const LandingPage = () => {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  return (
    <Box width="100vw">
      <HeaderLandingPage
        openSignUp={openSignUp}
        setOpenSignUp={setOpenSignUp}
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
      />
      <SignUp
        openSignUp={openSignUp}
        setOpenSignUp={setOpenSignUp}
        setOpenLogin={setOpenLogin}
      />
      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setOpenSignUp={setOpenSignUp}
      />

      <Box
        display="flex"
        justifyContent="space-evenly"
        width="100%"
        sx={{
          backgroundColor: "#4ec4be56",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={2}
        >
          <Typography variant="h2" fontFamily="cursive" fontWeight="bold">
            CHIP ENGLISH
          </Typography>
          <Typography variant="h5">
            HỆ THỐNG HỌC TIẾNG ANH ONLINE DÀNH CHO TRẺ EM
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFA800",
              width: "200px",
              borderRadius: "20px",
              marginTop: 2,
              fontWeight: "bold",
              fontSize: "18px",
            }}
            onClick={() => {
              setOpenSignUp(true);
            }}
          >
            Let's learn
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" p={4}>
          <img
            style={{
              width: "300px",
              borderRadius: "50%",
              border: "5px solid #4ec4be56",
              backgroundColor: "#ffffff55",
            }}
            alt="person"
            src="/images/landing_page/person.png"
          />
        </Box>
      </Box>

      <ClassDescribe />
      <Footer />
    </Box>
  );
};

export default LandingPage;
