export default class Api {
    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json'
        }
    }

    static get(route) {
        return this.xhr(route, null, 'GET')
    }

    static put(route, params) {
        return this.xhr(route, null, 'PUT')
    }

    static post(route, params) {
        return this.xhr(route, null, 'POST')
    }

    static delete(route, params) {
        return this.xhr(route, null, 'DELETE')
    }

    static xhr(route, params, method) {

        let options = Object.assign({ method: method }, params ? { body: JSON.stringify(params) } : null)
        options.headers = Api.headers()

        return fetch(route, options)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response ", responseJson)
                return responseJson;
            }).catch((error) => {
                throw error;
            });
    }
}
