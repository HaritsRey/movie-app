
import axios from "axios";

const API_KEY = "8c0234c5";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getMovieDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};