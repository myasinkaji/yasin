import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/cd';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')
const TREE_ADDRESS = BASE_ADDRESS.concat('/tree')
const LAZY_ADDRESS = BASE_ADDRESS.concat('/lazy')

export const SEARCH_CRITERIA = {
    code: '',
    name: '',
    type: '',
    parent: ''
};

export const INITIAL_COUNTRY_DIVISION = {
    code: '',
    name: '',
    type: '',
    parent: ''
}
export const DEFAULT_PAGE_REQUEST = {
    page: 0,
    pageSize: Constants.DEFAULT_ROWS_PER_PAGE,
    order: Constants.DEFAULT_ORDER,
    orderBy: 'type'
}

export function getPage(pageRequest) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat(BaseService.getPageRequestURLParams(pageRequest))
    return RestService.get(url)
}

export function remove(code) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('code=')
        .concat(code);
    return RestService.delete(url);
}
export function save(countryDivision) {
    return RestService.post(BASE_ADDRESS, countryDivision);
}
export function getLazy() {
    return RestService.get(LAZY_ADDRESS)
}

export function getTree() {
    return RestService.get(TREE_ADDRESS);
}
export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(countryDivision, setErrors) {
    const errors = {};
    errors.code = isBlank(String(countryDivision.code)) ? 'code is required' : '';
    errors.name = isBlank(countryDivision.name) ? 'name is required' : '';
    errors.type = isBlank(String(countryDivision.type)) ? 'type is required' : '';
    errors.parent = isBlank(String(countryDivision.parent)) ? 'parent is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();