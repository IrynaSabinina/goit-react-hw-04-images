import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '28362853-f4179f2b0382cbb2305a6e9dc';
export const api = (search, page) => {
  return axios.get(
    `api/?key=${API_KEY}&q=${search}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
