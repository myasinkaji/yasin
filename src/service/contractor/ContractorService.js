import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/contractor';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')

export const CONTRACTOR_SEARCH_CRITERIA = {
    firstname: '',
    lastname: '',
    nationalCode: '',
    birthDate: '',
    postalCode: '',
    phone: '',
    email: '',
    uniqueId: '',
    companyName: '',
    countryDivisionId: '',
    provinceGuildId: '',
};

export const INITIAL_CONTRACTOR = {
    firstname: '',
    lastname: '',
    nationalCode: '',
    birthDate: '',
    postalCode: '',
    phone: '',
    email: '',
    uniqueId: '',
    companyName: '',
    countryDivisionId: '',
    provinceGuildId: '',
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

export function remove(contractorCode) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('code=')
        .concat(contractorCode);
    return RestService.delete(url);
}
export function save(contractor) {
    return RestService.post(BASE_ADDRESS, contractor);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(contractor, setErrors) {
    const errors = {};
    errors.firstname = isBlank(contractor.firstname) ? 'firstname is required' : '';
    errors.lastname = isBlank(contractor.lastname) ? 'firstname is required' : '';
    errors.nationalCode = isBlank(String(contractor.nationalCode)) ? 'national code is required' : '';
    errors.birthDate = isBlank(String(contractor.birthDate)) ? 'birth date is required' : '';
    errors.postalCode = isBlank(String(contractor.postalCode)) ? 'postal code is required' : '';
    errors.phone = isBlank(contractor.phone) ? 'phone is required' : '';
    errors.email = isBlank(contractor.email) ? 'email is required' : '';
    errors.uniqueId = isBlank(String(contractor.uniqueId)) ? 'unique id is required' : '';
    errors.companyName = isBlank(contractor.companyName) ? 'companyName is required' : '';
    errors.countryDivisionId = isBlank(String(contractor.countryDivisionId)) ? 'country division is required' : '';
    errors.provinceGuildId = isBlank(String(contractor.provinceGuildId)) ? 'province guild is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();