import axios from 'axios';

class LoginAPI {
    constructor() {
        this.api = axios.create({
            baseURL: "https://equipoyosh.com/",
        });
    }

    async getUsers(){
        let response = await this.api.get('stock-nutrinatalia/persona?ejemplo=%7B%22soloUsuariosDelSistema%22%3Atrue%7D');
        return response.data;
    }
}

export default new LoginAPI();