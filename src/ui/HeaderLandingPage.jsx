import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#20bec6",
    },
  },
});
function HeaderLandingPage(prop) {
  const { openSignUp, setOpenSignUp, openLogin, setOpenLogin } = prop;
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              alt="EnglishChip"
              src="/images/logo.jpg"
              sx={{ width: 70, height: 70 }}
            />

            <h1
              style={{
                padding: "10px",
                fontFamily: "Cabin, cursive",
                color: "white",
                fontSize: "40px",

                flexGrow: 1,
                margin: "10px",
              }}
            >
              Chip English
            </h1>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFA800",
                fontFamily: "SVN-Poppins, sans-serif",
                fontWeight: "bold",
                borderRadius: "20px",
                fontSize: "16px",
                marginRight: "10px",
                color: "white",
              }}
              onClick={handleOpenLogin}
            >
              Đăng nhập
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFA800",
                fontFamily: "SVN-Poppins, sans-serif",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
              }}
              onClick={handleOpenSignUp}
            >
              Đăng ký
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default HeaderLandingPage;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";

// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import { createTheme } from "@mui/material/styles";
// import { ThemeProvider } from "@mui/material/styles";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#20bec6",
//     },
//   },
// });
// function HeaderLandingPage(prop) {
//   const { openSignUp, setOpenSignUp, openLogin, setOpenLogin } = prop;
//   const handleOpenSignUp = () => {
//     setOpenSignUp(true);
//   };
//   const handleOpenLogin = () => {
//     setOpenLogin(true);
//   };
//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="relative" color="primary" >
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <Avatar
//               alt="EnglishChip"
//               src="/images/logo.jpg"
//               sx={{ width: 80, height: 80 }}
//             />
//             <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//               <h1
//                 style={{
//                   padding: "10px",
//                   fontFamily: "Comic Sans MS, cursive",
//                   color: "white",
//                   fontSize: "30px",
//                 }}
//               >
//                 Chip English
//               </h1>
//             </Box>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#FFA800",
//                 fontFamily: "SVN-Poppins, sans-serif",
//                 fontWeight: "bold",
//                 borderRadius: "20px",
//                 fontSize: "16px",
//                 marginRight: "10px",
//                 color: "white",
//               }}
//               onClick={handleOpenLogin}
//             >
//               Đăng nhập
//             </Button>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#FFA800",
//                 fontFamily: "SVN-Poppins, sans-serif",
//                 borderRadius: "20px",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 color: "white",
//               }}
//               onClick={handleOpenSignUp}
//             >
//               Đăng ký
//             </Button>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </ThemeProvider>
//   );
// }
// export default HeaderLandingPage;
