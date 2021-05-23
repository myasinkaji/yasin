import Axios from 'axios';

// const BASE_URL = 'http://192.168.50.27:8080/hoviat';
const BASE_URL = 'http://localhost:8080/hoviat';

function getFunc(url) {
    const config = {
        method: 'get',
        url: BASE_URL + url,
    }

    return Axios(config);
}

function postFunc(url, object) {
    const data = JSON.stringify(object);
    const config = {
        method: 'post',
        url: BASE_URL + url,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    }
    return Axios(config);
}

function putFunc(url) {
    console.log('put to url: ', url);
}

function deleteFunc(url) {
    url = BASE_URL + url;
    return Axios.delete(url);
}

const RestService = {
    get: getFunc,
    post: postFunc,
    put: putFunc,
    delete: deleteFunc,
}

export default RestService;