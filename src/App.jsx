import React from "react";
// import axios from "axios";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import DashBoard from "./pages/DashBoard";
import AppLayout from "./ui/AppLayout";
import Course from "./pages/Course";
import LangdingPage from "./pages/LandingPage";
import UnitDetail from "./pages/UnitDetail";
import Exercises from "./pages/Exercises";
import Statistic from "./pages/Statistic";
import ProtectedPage from "./pages/Protected";
// import { isJsonString } from "./utils/utils";
// import * as UserService from "./services/UserService";
// import { updateUser } from "./redux/slides/userSlice";
// import { useDispatch } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// axios.defaults.withCredentials = true;
const App = () => {
  // const dispatch = useDispatch();

  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token);
  //   console.log("user details", res?.user);
  //   const userDetail = res?.user;

  //   dispatch(
  //     updateUser({
  //       userName: userDetail?.userName || userDetail?.displayName,
  //       profilePicture: userDetail?.profilePicture || "",
  //       access_token: token,
  //     })
  //   );
  //   console.log("res", res);
  // };

  // const handleDecoded = () => {
  //   let storageData = localStorage.getItem("access_token");
  //   let decoded = {};
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData);
  //     decoded = jwtDecode(storageData);
  //   }
  //   return { decoded, storageData };
  // };

  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const { decoded } = handleDecoded();
  //     console.log("decoded EXP", decoded?.exp);

  //     console.log("Date.now()", Date.now() / 1000);
  //     if (decoded?.exp < Date.now() / 1000) {
  //       const data = await UserService.refreshToken();
  //       config.headers["token"] = `Bearer ${data?.access_token}`;
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );
  // useEffect(() => {
  //   const { storageData, decoded } = handleDecoded();
  //   if (decoded?.id) {
  //     handleGetDetailsUser(decoded?.id, storageData);
  //   }
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedPage />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route
              path="/course/:courseId/semester/:semesterId"
              element={<CourseWrapper />}
            />
            <Route path="/statistic" element={<Statistic />} />
          </Route>
          <Route
            path="/course/:courseId/semester/:semesterId/unit/:unitId"
            element={<UnitWrapper />}
          />
          <Route path="/lesson/:lessonId" element={<LessonWrapper />} />
        </Route>

        <Route index element={<Navigate replace to="landing-page" />} />
        <Route path="/landing-page" element={<LangdingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
// Wrapper component to extract URL params and pass them as props to Course component
const CourseWrapper = () => {
  const { courseId, semesterId } = useParams();
  return <Course courseId={courseId} semesterId={semesterId} />;
};
const UnitWrapper = () => {
  const { courseId, semesterId, unitId } = useParams();
  return (
    <UnitDetail courseId={courseId} semesterId={semesterId} unitId={unitId} />
  );
};
export default App;
const LessonWrapper = () => {
  const { lessonId } = useParams();
  return <Exercises lessonId={lessonId} />;
};
