import axios from 'axios';
import config from '../config';

export const get = async (id) => {
  const result = await axios.get(
    config.apiURL + `stock-nutrinatalia/persona/${id}`
  );
  return result.data;
};

export const post = async (data) => {
  const result = await axios.post(
    config.apiURL + 'stock-nutrinatalia/persona/',
    data,
    { headers: { usuario: 'usuario2' } }
  );
  return result.data;
};

export const getAll = async (params) => {
  let url = config.apiURL + 'stock-nutrinatalia/persona';

  const result = await axios.get(url, {
    headers: { usuario: 'usuario2' },
    params,
  });
  return result.data.lista;
};
