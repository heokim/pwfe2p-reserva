import axios from 'axios';
import config from '../config';

class EmpleadoAPI {
    constructor() {
        this.api = axios.create({
            baseURL: config.apiURL,
        });
    }

    async getEmpleados() {
        let response = await this.api.get(`stock-nutrinatalia/persona?ejemplo=${encodeURIComponent('{"soloUsuariosDelSistema":true}')}`);
        return response?.data?.lista;
    }
}

export default new EmpleadoAPI();