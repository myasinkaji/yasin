import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/tc';
const LAZY_ADDRESS = BASE_ADDRESS.concat('/lazy')
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')

export const TagCompany_TOGGLES = [
    'producer',
    'importer',
    'visualTag',
    'rfidTag',
    'microchipTag',
    'bolusesTag',
]
export const TagCompany_SEARCH_CRITERIA = {
    uniqueId: '',
    companyName: '',
    postalCode: '',
    establishedYear: '',
    managerName: '',
    producer: false,
    importer: false,
    visualTag: false,
    rfidTag: false,
    microchipTag: false,
    bolusesTag: false,
    active: false,
};

export const INITIAL_TagCompany = {
    uniqueId: '',
    companyName: '',
    postalCode: '',
    establishedYear: '',
    managerName: '',
    producer: false,
    importer: false,
    visualTag: false,
    rfidTag: false,
    microchipTag: false,
    bolusesTag: false,
    active: false,
}
export const DEFAULT_PAGE_REQUEST = {
    page: 0,
    pageSize: Constants.DEFAULT_ROWS_PER_PAGE,
    order: Constants.DESC_ORDER,
    orderBy: 'establishedYear'
}

export function getPage(pageRequest) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat(BaseService.getPageRequestURLParams(pageRequest))
    return RestService.get(url)
}

export function remove(tagCompanyId) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('id=')
        .concat(tagCompanyId);
    return RestService.delete(url);
}
export function save(tagCompany) {
    return RestService.post(BASE_ADDRESS, tagCompany);
}

export function getLazy() {
    return RestService.get(LAZY_ADDRESS)
}
export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(tagCompany, setErrors) {
    const errors = {};
    errors.uniqueId = isBlank(String(tagCompany.uniqueId)) ? 'unique id is required' : '';
    errors.companyName = isBlank(tagCompany.companyName) ? 'company name is required' : '';
    errors.postalCode = isBlank(String(tagCompany.postalCode)) ? 'postal code is required' : '';
    errors.establishedYear = isBlank(String(tagCompany.establishedYear)) ? 'established year is required' : '';
    errors.managerName = isBlank(tagCompany.managerName) ? 'manager name is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();