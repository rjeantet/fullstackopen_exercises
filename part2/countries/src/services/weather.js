import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const api_key = import.meta.env.VITE_SOME_KEY;

const getWeather = (lat, lon) => {
  return axios.get(
    `${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  );
};

export default {
  getWeather: getWeather,
};
