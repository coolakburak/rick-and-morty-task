
 


// import axios from 'axios';

// const API_URL = 'https://rickandmortyapi.com/api';

// export const fetchEpisodes = async (page = 1) => {
//   const response = await axios.get(`${API_URL}/episode?page=${page}`);
//   return response.data;
// };

// export const fetchEpisodeDetails = async (id) => {
//   const response = await axios.get(`${API_URL}/episode/${id}`);
//   return response.data;
// };

// export const fetchCharactersByPage = async (page) => {
//   const response = await fetch(`${API_URL}/character?page=${page}`);
//   const data = await response.json();
//   return data;
// };

// export const fetchCharacterDetails = async (id) => {
//    const response = await axios.get(`${API_URL}/character/${id}`);
//    return response.data;
//  };



import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = async (page = 1) => {
  const response = await axios.get(`${API_URL}/episode?page=${page}`);
  return response.data;
};

export const fetchEpisodeDetails = async (id) => {
  const response = await axios.get(`${API_URL}/episode/${id}`);
  return response.data;
};

export const fetchCharactersByPage = async (page) => {
  const response = await axios.get(`${API_URL}/character?page=${page}`);
  return response.data;
};

export const fetchCharacterDetails = async (id) => {
  const response = await axios.get(`${API_URL}/character/${id}`);
  return response.data;
};
