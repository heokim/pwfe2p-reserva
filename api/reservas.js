import axios from 'axios';
import config from '../config';

class ReservaAPI {
    constructor() {
        this.api = axios.create({
            baseURL: config.apiURL,
        });
    }

    async getReservas(params) {
        let response = await this.api.get('stock-nutrinatalia/reserva', {
            headers: { usuario: 'usuario1' }, params
        });
        return response?.data?.lista;
    }

    async getAgenda(idEmpleado, fecha) {
        console.log(`Fecha: ${fecha}`);
        let response = await this.api.get(`/stock-nutrinatalia/persona/${idEmpleado}/agenda?fecha=${fecha}&disponible=S`);
        return response?.data;
    }

    async postReserva(body) {
        await this.api.post('stock-nutrinatalia/reserva', body, {
            headers: { usuario: 'usuario1' }
        });
    }

    async putReserva(body) {
        console.log(body);
        await this.api.put('stock-nutrinatalia/reserva', body, {
            headers: { usuario: 'usuario1' }
        });
    }

    async cancelarReserva(idReserva) {
        console.log(idReserva);
        await this.api.delete(`stock-nutrinatalia/reserva/${idReserva}`, {
            headers: { usuario: 'usuario1' }
        })
    } 
}

export default new ReservaAPI();