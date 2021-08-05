import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/agent';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')

export const SEARCH_CRITERIA = {
    nationalCode: '',
    uniqueId: '',
    postalCode: '',
    mobile: '',
    gradeId: '',
    countryDivisionId: '',
    contractorNationalCode: ''
};

export const INITIAL_AGENT = {
    nationalCode: '',
    uniqueId: '',
    birthDate: '',
    postalCode: '',
    firstname: '',
    lastname: '',
    phone: '',
    mobile: '',
    gradeId: '',
    countryDivisionId: '',
}
export const DEFAULT_PAGE_REQUEST = {
    page: 0,
    pageSize: Constants.DEFAULT_ROWS_PER_PAGE,
    order: Constants.DESC_ORDER,
    orderBy: 'grade'
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

export function save(agent) {
    return RestService.post(BASE_ADDRESS, agent);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(agent, setErrors) {
    const errors = {};
    errors.nationalCode = isBlank(String(agent.nationalCode)) ? 'national code is required' : '';
    errors.uniqueId = isBlank(String(agent.uniqueId)) ? 'unique id is required' : '';
    errors.birthDate = isBlank(String(agent.birthDate)) ? 'birth date is required' : '';
    errors.postalCode = isBlank(String(agent.postalCode)) ? 'postal code is required' : '';
    errors.firstname = isBlank(agent.firstname) ? 'firstname is required' : '';
    errors.lastname = isBlank(agent.lastname) ? 'lastname is required' : '';
    errors.phone = isBlank(agent.phone) ? 'phone is required' : '';
    errors.mobile = isBlank(agent.mobile) ? 'mobile is required' : '';
    errors.gradeId = isBlank(String(agent.gradeId)) ? 'grade is required' : '';
    errors.countryDivisionId = isBlank(String(agent.countryDivisionId)) ? 'country division is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();

export const getGrade = agent => agent.gradeId ?
    {id: agent.gradeId, title: agent.gradeTitle} : undefined;

export const getCountryDivision = agent => agent.countryDivisionId ?
    {id: agent.countryDivisionId, title: agent.countryDivisionName} : undefined;
