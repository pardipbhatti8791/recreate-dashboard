import axios from 'axios';

export const gpAxios = axios.create({
  baseURL: 'https://pyxis.azure-api.net',
  headers: {
    'Ocp-Apim-Subscription-Key': '81e4593537654e509521bf718eec149e'
  }
});

gpAxios.defaults.headers.common.token = localStorage.getItem('id_token');
