import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const generateStudyContent = async (data) => {
  const response = await API.post("/generate", data);
  return response.data;
};