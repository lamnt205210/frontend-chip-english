import React, { useEffect, useState } from "react";
import { useMutationHook } from "../hooks/useMutationHook";
import {
  Dialog,
  TextField,
  Button,
  Checkbox,
  DialogTitle,
  Box,
  DialogContent,
  Typography,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import * as UserService from "../services/UserService";
import LoadingComponent from "../ui/LoadingComponent";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { openLogin, setOpenLogin, setOpenSignUp } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [openLoginSucessMessage, setOpenLoginSucessMessage] = useState(false);

  const navigate = useNavigate();

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleChangePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenLoginSucessMessage(false);
  };
  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token);
  //   dispatch(updateUser({ ...res?.data, access_token: token }));
  //   console.log("res", res);
  // };
  const handleLoginWithGoogle = () => {
    window.open("http://localhost:3000/api/user/auth/google", "_self");
    localStorage.setItem("access_token");
  };
  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { data, error, isPending, isSuccess } = mutation;
  const handleLogin = () => {
    mutation.mutate({
      userName,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      console.log("isSuccess", isSuccess);
      setOpenLoginSucessMessage(true);
      navigate("/dashboard");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      // if (data?.access_token) {
      //   const decoded = jwtDecode(data?.access_token);
      //   console.log("decoded", decoded);
      //   if (decoded?.id) {
      //     handleGetDetailsUser(decoded?.id, data?.access_token);
      //   }
      // }
    }
  }, [isSuccess]);
  console.log("mutation", mutation);

  return (
    <>
      <Dialog
        open={openLogin}
        fullWidth={true}
        onClose={handleCloseLogin}
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
          "& .MuiDialog-paper": {
            borderRadius: "35px",
          },
        }}
      >
        <LoadingComponent open={isPending} />
        {error && (
          <Alert severity="error">{error?.response.data.message}</Alert>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "24px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: "bold",
              marginLeft: "180px",
            }}
          >
            Đăng nhập
          </DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#e9f8f9",
                marginRight: "30px",
              }}
              onClick={handleCloseLogin}
            >
              <CloseIcon sx={{ cursor: "pointer", color: "#21BDC6" }} />
            </IconButton>
          </Box>
        </Box>
        <DialogContent>
          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              label="Tên đăng nhập"
              fullWidth={true}
              value={userName}
              onChange={handleChangeUserName}
            />
          </Box>
          <Box
            sx={{
              marginBottom: "20px",
              alignItems: "center",
              display: "flex",
              position: "relative",
            }}
          >
            <TextField
              label="Mật khẩu"
              fullWidth={true}
              onChange={handleChangePassword}
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <IconButton
              sx={{ position: "absolute", right: "0" }}
              onClick={handleChangePasswordVisible}
            >
              <img
                src={
                  passwordVisible
                    ? "/images/eye_hide.png"
                    : "/images/eye_show.svg"
                }
                alt="eye"
              />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: "flex" }}>
            <Checkbox label={"Lưu mật khẩu"} />
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Cabin, sans-serif",
              }}
            >
              Lưu mật khẩu
            </Typography>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#21BDC6",
                fontFamily: "SVN-Poppins, sans-serif",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
              }}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e9f8f9",
                fontFamily: "SVN-Poppins, sans-serif",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#21BDC6",
              }}
              onClick={handleLoginWithGoogle}
            >
              Đăng nhập với Google
              <GoogleIcon
                sx={{
                  color: "#21BDC6",
                  marginLeft: "10px",
                }}
              />
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Cabin, sans-serif",
              }}
            >
              ---Chưa có tài khoản?
            </Typography>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Cabin, sans-serif",
                color: "#21BDC6",
                textDecoration: "underline",
              }}
              onClick={() => {
                setOpenLogin(false);
                setOpenSignUp(true);
              }}
            >
              Đăng ký ngay
            </Typography>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Cabin, sans-serif",
              }}
            >
              ---
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openLoginSucessMessage}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Login Sucessful !
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
