import axios from 'axios';
import config from '../config';

export const getAll = async () => {
  let url = config.apiURL + 'stock-nutrinatalia/categoria';

  const result = await axios.get(url, {
    Headers: { usuario: 'gustavo' },
  });
  return result.data.lista;
};
