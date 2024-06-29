import axios from "axios";

export const getAllCourses = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/course/`);

  return res.data;
};

export const getUnits = async (courseId, semesterId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/course/${courseId}/semester/${semesterId}`
  );

  return res.data;
};

export const getUnitDetails = async (unitId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/course/unit/${unitId}`
  );

  return res.data;
};
export const getLessonDetails = async (lessonId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/course/lesson/${lessonId}`
  );

  return res.data;
};

export const getSemesterId = async (semesterNumber) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/course/semester/${semesterNumber}`
  );

  return res.data;
};
export const getCourseId = async (courseNumber) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/course/${courseNumber}`
  );
  return res.data;
};

export const getMaterialById = async (materialId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/course/material/${materialId}`
  );

  return res.data;
};
