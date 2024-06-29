import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { isJsonString } from "../utils/utils";
export const GetUserId = () => {
  let access_token = useSelector((state) => state.user.access_token);
  access_token = JSON.stringify(access_token);

  let decoded = {};
  if (access_token && isJsonString(access_token)) {
    decoded = jwtDecode(access_token);
  }
  return decoded?.id;
};
