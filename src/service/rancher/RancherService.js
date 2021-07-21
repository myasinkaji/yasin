import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/rancher';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')

export const SEARCH_CRITERIA = {
    nationalCode: '',
    mobile: '',
    companyNationalId: '',
    companyName: '',
    countryDivisionId: '',
};

export const INITIAL_RANCHER = {
    nationalCode: '',
    birthDate: '',
    firstname: '',
    lastname: '',
    phone: '',
    mobile: '',
    legal: '',
    companyNationalId: '',
    companyName: '',
    countryDivisionId: '',
}
export const DEFAULT_PAGE_REQUEST = {
    page: 0,
    pageSize: Constants.DEFAULT_ROWS_PER_PAGE,
    order: Constants.DESC_ORDER,
    orderBy: 'legal'
}

export function getPage(pageRequest) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat(BaseService.getPageRequestURLParams(pageRequest))
    return RestService.get(url)
}

export function remove(nationalCode) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('nationalCode=')
        .concat(nationalCode);
    return RestService.delete(url);
}

export function save(rancher) {
    return RestService.post(BASE_ADDRESS, rancher);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(rancher, setErrors) {
    const errors = {};

    errors.nationalCode = isBlank(String(rancher.nationalCode)) ? 'national code is required' : '';
    errors.birthDate = isBlank(String(rancher.birthDate)) ? 'birth date is required' : '';
    errors.firstname = isBlank(rancher.firstname) ? 'firstname is required' : '';
    errors.lastname = isBlank(rancher.lastname) ? 'lastname is required' : '';
    errors.phone = isBlank(rancher.phone) ? 'phone is required' : '';
    errors.mobile = isBlank(rancher.mobile) ? 'mobile is required' : '';
    errors.companyNationalId = isBlank(String(rancher.companyNationalId)) ? 'Company National Id is required' : '';
    errors.companyName = isBlank(String(rancher.companyName)) ? 'Company Name is required' : '';
    errors.countryDivisionId = isBlank(String(rancher.countryDivisionId)) ? 'country division is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();

export const getCountryDivision = rancher => rancher.countryDivisionId ?
    {id: rancher.countryDivisionId, title: rancher.countryDivisionName} : undefined;
