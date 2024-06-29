import Menu from "./Menu";
import React, { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import { isJsonString } from "../utils/utils";
import * as UserService from "../services/UserService";
import { updateUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
axios.defaults.withCredentials = true;
const AppLayout = () => {
  const dispatch = useDispatch();

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    console.log("user details", res?.user);
    const userDetail = res?.user;
    console.log("userDetail profile Picture", userDetail?.profilePicture);
    dispatch(
      updateUser({
        userName: userDetail?.userName || userDetail?.displayName,
        profilePicture: userDetail?.profilePicture || "",
        access_token: token,
      })
    );
    console.log("res", res);
  };

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      console.log("decoded EXP", decoded?.exp);

      console.log("Date.now()", Date.now() / 1000);
      if (decoded?.exp < Date.now() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Menu />
      <Outlet
        sx={{
          flex: 1,
          overflowX: "hidden",
        }}
      />
    </Box>
  );
};

export default AppLayout;
