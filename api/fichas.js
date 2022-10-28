import axios from 'axios';
import config from '../config';
export const getAll = async (params) => {
  const response = await axios.get(
    config.apiURL + 'stock-nutrinatalia/fichaClinica',
    { headers: { usuario: 'gustavo' }, params }
  );
  return response.data.lista;
};

export const post = async (data) => {
  const result = await axios.post(
    config.apiURL + 'stock-nutrinatalia/fichaClinica/',
    data,
    { headers: { usuario: 'usuario2' } }
  );
  return result.data;
};

export const put = async (data) => {
  const result = await axios.put(
    config.apiURL + 'stock-nutrinatalia/fichaClinica/',
    data,
    { headers: { usuario: 'usuario2' } }
  );
  return result.data;
};
