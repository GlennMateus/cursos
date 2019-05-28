import axios from 'axios';

const api = axios.create({
  baseUrl: 'https://rocketseat-node.herohuapp.com/api'
});

export default api;
