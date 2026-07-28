import axios from "axios";

const API = axios.create({
  baseURL: "https://Study-Assistance.onrender.com",
});

export const generateStudyContent = async (data) => {
  const response = await API.post("/generate", data);
  return response.data;
};