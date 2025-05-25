import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// export const getCharacters = async (page = 1, search = "") => {
//   const res = await axios.get(`${API_BASE}/characters`, {
//     params: { page, search },
//   });
//   return res.data;
// };

// export const getCharacterDetails = async (id) => {
//   const res = await axios.get(`${API_BASE}/characters/${id}`);
//   return res.data;
// };

export const getCharacters = async (page = 1, search = "") => {
  const res = await axios.get(`${API_BASE}/characters`, {
    params: { page, search },
  });
  return res.data;
};

export const getCharacterDetails = async (id) => {
  const res = await axios.get(`${API_BASE}/characters/${id}`);
  return res.data;
};
