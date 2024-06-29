export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (e) {
    console.log("eRR", e);
    return false;
  }
  return true;
};
