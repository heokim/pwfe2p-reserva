import axios from 'axios';
import config from '../config';

export const get = async (id) => {
  const result = await axios.get(
    config.apiURL + `stock-nutrinatalia/tipoProducto/${id}`
  );
  return result.data;
};

export const getAll = async (params) => {
  let url = config.apiURL + 'stock-nutrinatalia/tipoProducto';

  const result = await axios.get(url, {
    Headers: { usuario: 'gustavo' },
    params,
  });
  return result.data.lista;
};
