import React, { useEffect, useState } from "react";
import {
  Dialog,
  TextField,
  Button,
  DialogTitle,
  Box,
  DialogContent,
  IconButton,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutationHook } from "../hooks/useMutationHook";
import * as UserService from "../services/UserService";
import LoadingComponent from "../ui/LoadingComponent";

const SignUp = (props) => {
  const { openSignUp, setOpenSignUp, setOpenLogin } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSignUpSucessMessage, setOpenSignUpSucessMessage] = useState(false);

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };
  const handleChangePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChangeConfirmPasswordVisible = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSignUpSucessMessage(false);
  };
  const mutation = useMutationHook((data) => UserService.signUpUser(data));
  const { data, error, isPending, isSuccess } = mutation;
  const handleSignUp = () => {
    mutation.mutate({
      userName,
      password,
      confirmPassword,
    });
  };
  useEffect(() => {
    if (isSuccess && data.status === "OK") {
      setOpenSignUpSucessMessage(true);
      setOpenLogin(true);
      setOpenSignUp(false);
    }
  }, [isSuccess]);
  console.log("mutation", mutation);
  return (
    <>
      <Dialog
        open={openSignUp}
        onClose={handleCloseSignUp}
        fullWidth={true}
        sx={{
          backdropFilter: "blur(2px) sepia(5%)",
          "& .MuiDialog-paper": {
            borderRadius: "35px",
          },
        }}
      >
        <LoadingComponent open={isPending} />
        {error && (
          <Alert severity="error">
            {data?.message || error?.response.data.message}
          </Alert>
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
              marginLeft: "150px",
            }}
          >
            Đăng ký tài khoản
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
              onClick={handleCloseSignUp}
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
              type={passwordVisible ? "text" : "password"}
              onChange={handleOnChangePassword}
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
          <Box
            sx={{
              marginBottom: "20px",
              alignItems: "center",
              display: "flex",
              position: "relative",
            }}
          >
            <TextField
              label="Nhập lại mật khẩu"
              fullWidth={true}
              value={confirmPassword}
              type={confirmPasswordVisible ? "text" : "password"}
              onChange={handleOnChangeConfirmPassword}
            />

            <IconButton
              sx={{ position: "absolute", right: "0" }}
              onClick={handleChangeConfirmPasswordVisible}
            >
              <img
                src={
                  confirmPasswordVisible
                    ? "/images/eye_hide.png"
                    : "/images/eye_show.svg"
                }
                alt="eye"
              />
            </IconButton>
          </Box>
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
              onClick={handleSignUp}
            >
              Đăng ký
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Cabin, sans-serif",
              }}
            >
              ---Đã có tài khoản?
            </Typography>
            <Typography
              sx={{
                alignContent: "center",
                fontFamily: "Cabin, sans-serif",
                color: "#21BDC6",
                textDecoration: "underline",
              }}
              onClick={() => {
                setOpenLogin(true);
                setOpenSignUp(false);
              }}
            >
              Đăng nhập ngay
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
        open={openSignUpSucessMessage}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Sign Up Sucessful !
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignUp;
