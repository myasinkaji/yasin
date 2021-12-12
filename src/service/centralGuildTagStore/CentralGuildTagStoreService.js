import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/tag-request';
const DELIVERED = BASE_ADDRESS.concat('/cartable-page');
const CENTRAL_DISTRIBUTE = BASE_ADDRESS.concat('/cg-tr-distribute');
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')

export const SEARCH_CRITERIA = {
    animalKind: '',
    tagType: '',
    count: '',
    tagCompanyId: '',
    centralGuildCode: '',
};


export const INITIAL_TAG_REQUEST_DISTRIBUTE = {
    tagRequestId: '',
    count: '',
    provinceGuildCode: '',
}

export const INITIAL_TAG_REQUEST = {
    animalKind: '',
    tagType: '',
    count: '',
    remained: '',
    createdTime: '',
    tagCompanyId: '',
    centralGuildCode: '',
}
export const DEFAULT_PAGE_REQUEST = {
    page: 0,
    pageSize: Constants.DEFAULT_ROWS_PER_PAGE,
    order: Constants.DESC_ORDER,
    orderBy: 'created'
}

export function getDeliveredTagRequests(pageRequest) {
    const url = DELIVERED
        .concat('?')
        .concat(BaseService.getPageRequestURLParams(pageRequest))
    return RestService.get(url)
}

export function save(tagRequest) {
    return RestService.post(CENTRAL_DISTRIBUTE, tagRequest);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(tagRequest, setErrors) {
    const errors = {};
    errors.distributeCount = !tagRequest.distributeCount || isBlank(String(tagRequest.distributeCount)) ? 'Count is required' : '';
    errors.provinceGuildCode = !tagRequest.provinceGuildCode || isBlank(String(tagRequest.provinceGuildCode)) ? 'Province Guild is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

export function checkValidation(tagRequest, setErrors) {
    const errors = {};
    errors.distributeCount = tagRequest.distributeCount > tagRequest.remained ? 'Count must be equal or less than '.concat(tagRequest.remained) : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();
