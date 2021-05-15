import Axios from 'axios';

function getFunc(url) {
    console.log('getting url: ', url);
}
function postFunc(url) {
    console.log('posting to url: ', url);
}
function putFunc(url) {
    console.log('put to url: ', url);
}
function deleteFunc(url) {
    console.log('deleting url: ', url);
}
const RestService = {
    get: getFunc,
    post: postFunc,
    put: putFunc,
    delete: deleteFunc,
}

export default RestService;