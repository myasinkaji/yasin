import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/activity';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')
const LAZY_ADDRESS = BASE_ADDRESS.concat('/lazy')

export const ACTIVITY_SEARCH_CRITERIA = {
    code: '',
    name: '',
};

export const INITIAL_ACTIVITY = {
    code: '',
    name: '',
}
export const DEFAULT_PAGE_REQUEST = {
    page: 0,
    pageSize: Constants.DEFAULT_ROWS_PER_PAGE,
    order: Constants.DEFAULT_ORDER,
    orderBy: 'code'
}

export function getPage(pageRequest) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat(BaseService.getPageRequestURLParams(pageRequest))
    return RestService.get(url)
}

export function getLazy() {
    return RestService.get(LAZY_ADDRESS)
}

export function remove(activityCode) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('code=')
        .concat(activityCode);
    return RestService.delete(url);
}
export function save(activity) {
    return RestService.post(BASE_ADDRESS, activity);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(activity, setErrors) {
    const errors = {};
    errors.code = isBlank(String(activity.code)) ? 'code is required' : '';
    errors.name = isBlank(activity.name) ? 'name is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = str => !str.trim();