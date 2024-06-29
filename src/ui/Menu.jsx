import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Box,
  List,
  CssBaseline,
  Divider,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/userSlice";
import * as UserService from "../services/UserService";
import { useQuery } from "@tanstack/react-query";
import * as CourseService from "../services/CourseService";
const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(16)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(16)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "sticky",

  top: 0,
  // width: drawerWidth,
  padding: theme.spacing(4, 2),
  // marginTop: "20px",

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "sticky", // Fixed position at the bottom
  bottom: 0,
  width: drawerWidth,
  marginTop: "auto",
}));

const DrawerContent = styled("div")(({ theme }) => ({
  overflow: "auto",
  paddingLeft: "10px",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#20bec6",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#20bec6",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#20bec6",
      color: "white",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#20bec6",
      color: "white",
    },
  }),
}));

export default function Menu() {
  const [open, setOpen] = React.useState(true);
  const [openCourse, setOpenCourse] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCourseClick = () => {
    setOpenCourse(!openCourse);
  };
  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/landing-page");
  };
  const { data: dataCourses } = useQuery({
    queryKey: ["course"],
    queryFn: () => CourseService.getAllCourses(),
  });
  const courses = dataCourses?.courses || [];
  const { data: semesterData } = useQuery({
    queryKey: ["semester"],
    queryFn: () => CourseService.getSemesterId(1),
  });
  // console.log("semesterData", semesterData);
  const semesterId = semesterData || "";
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
              }}
              src={user.profilePicture}
            />
            <Typography
              variant="h6"
              noWrap
              visibility={open ? "visible" : "hidden"}
              sx={{
                fontFamily: "Cabin, sans-serif",
                fontWeight: "bold",
                marginTop: "10px",
                color: "#0f575a",
              }}
            >
              {user.userName}
            </Typography>
          </Box>
          <Button
            sx={{
              position: "absolute",
              right: open ? 0 : -10,
              bottom: 15,
            }}
          >
            <IconButton
              onClick={() => {
                open ? handleDrawerClose() : handleDrawerOpen();
              }}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Button>
        </DrawerHeader>
        <Divider />
        <DrawerContent>
          <List>
            <ListItem
              disablePadding
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  display: "flex",
                  justifyContent: open ? "initial" : "center",
                  alignItems: "center",
                  px: 2.5,
                }}
                onClick={handleCourseClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    marginRight: open ? 3 : 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LibraryBooksIcon fontSize="large" />
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText
                      primary={"Khóa học"}
                      sx={{
                        display: open ? "block" : "none",
                      }}
                      primaryTypographyProps={{
                        fontFamily: "Cabin, sans-serif",
                        fontWeight: "bold",
                        fontSize: "22px",
                      }}
                    />
                    {openCourse ? <ExpandLess /> : <ExpandMore />}
                  </>
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={openCourse && open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {courses.map((course, index) => {
                  return (
                    <ListItemButton
                      key={index}
                      sx={{ pl: 10, py: 0.5 }}
                      onClick={() => {
                        navigate(
                          `/course/${course._id}/semester/${semesterId}`
                        );
                      }}
                    >
                      <ListItemText
                        primary={`Tiếng Anh lớp ${course.courseNumber}`}
                        primaryTypographyProps={{
                          fontFamily: "Cabin, sans-serif",

                          fontSize: "19px",
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
            <ListItem
              disablePadding
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  display: "flex",
                  justifyContent: open ? "initial" : "center",
                  alignItems: "center",
                  px: 2.5,
                }}
                onClick={() => {
                  navigate("/statistic");
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    marginRight: open ? 3 : 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AssessmentIcon fontSize="large" />
                </ListItemIcon>
                {open && (
                  <>
                    <ListItemText
                      primary={"Kết quả học tập"}
                      sx={{
                        display: open ? "block" : "none",
                      }}
                      primaryTypographyProps={{
                        fontFamily: "Cabin, sans-serif",
                        fontWeight: "bold",
                        fontSize: "22px",
                      }}
                    />
                  </>
                )}
              </ListItemButton>
            </ListItem>
          </List>
        </DrawerContent>

        <Divider />
        {/* Logout option */}
        <DrawerFooter>
          <List>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  display: "flex",
                  justifyContent: open ? "initial" : "center",
                  alignItems: "center",
                  px: 2.5,
                }}
                onClick={handleLogout}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    marginRight: open ? 3 : 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LogoutIcon fontSize="large" />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Đăng xuất"
                    sx={{
                      display: open ? "block" : "none",
                    }}
                    primaryTypographyProps={{
                      fontFamily: "Cabin, sans-serif",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </List>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
}
