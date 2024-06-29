import axios from "axios";
export const updateGameScore = async (userId, gameId, lessonId, score) => {
  console.log(userId, gameId, lessonId, score);
  const res = await axios.post(
    `${
      import.meta.env.VITE_API_URL
    }/progress/score-game/${userId}/${gameId}/${lessonId}`,
    { score }
  );
  return res.data;
};
export const updateVideoScore = async (userId, lessonId, score) => {
  const res = await axios.post(
    `${
      import.meta.env.VITE_API_URL
    }/progress/score-video/${userId}/${lessonId}`,
    { score }
  );
  return res.data;
};
export const getCourseProgress = async (userId, courseNumber) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/progress/course-progress/${userId}/${courseNumber}`
  );
  return res.data;
};
export const getUnitProgress = async (userId, unitId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/progress/unit-progress/${userId}/${unitId}`
  );
  return res.data;
};
export const getLessonProgress = async (userId, lessonId) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/progress/lesson-progress/${userId}/${lessonId}`
  );
  return res.data;
};
export const getGameProgress = async (userId, lessonId) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/progress/game-progress/${userId}/${lessonId}`
  );
  return res.data;
};

export const getAverageScoreCourse = async (userId, courseId) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/progress/average-score/${userId}/${courseId}`
  );
  return res.data;
};

export const getRanking = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/progress/ranking`
  );
  return res.data;
};
