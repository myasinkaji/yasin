import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/subunit';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')

export const SUBUNIT_SEARCH_CRITERIA = {
    uniqueId: '',
    capacity: '',
    licenseNumber: '',
    licenseIssueDate: '',
    licenseExpireDate: ''
};

export const INITIAL_SUBUNIT = {
    uniqueId: '',
    active: '',
    capacity: '',
    hasLicense: '',
    licenseNumber: '',
    licenseIssueDate: '',
    licenseExpireDate: '',
    activityCode: '',
    activityName: '',
    herdCode: '',
    herdName: ''
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

export function remove(subunitId) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('id=')
        .concat(subunitId);
    return RestService.delete(url);
}

export function save(subunit) {
    return RestService.post(BASE_ADDRESS, subunit);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(subunit, setErrors) {
    const errors = {};
    errors.uniqueId = isBlank(String(subunit.uniqueId)) ? 'uniqueId is required' : '';
    errors.active = isBlank(String(subunit.active)) ? 'active is required' : '';
    errors.capacity = isBlank(String(subunit.capacity)) ? 'capacity is required' : '';
    errors.hasLicense = isBlank(String(subunit.hasLicense)) ? 'hasLicense is required' : '';
    errors.licenseNumber = isBlank(String(subunit.licenseNumber)) ? 'licenseNumber is required' : '';
    errors.licenseIssueDate = isBlank(String(subunit.licenseIssueDate)) ? 'licenseIssueDate is required' : '';
    errors.licenseExpireDate = isBlank(String(subunit.licenseExpireDate)) ? 'licenseExpireDate is required' : '';
    errors.activityCode = isBlank(String(subunit.activityCode)) ? 'activity is required' : '';
    errors.herdCode = isBlank(String(subunit.herdCode)) ? 'herd is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();

export const getActivityOf = subunit => subunit.countryDivisionId ?
    {id: subunit.activityCode, title: subunit.activityName} : undefined;

export const getHerdOf = subunit => subunit.countryDivisionId ?
    {id: subunit.herdCode, title: subunit.herdName} : undefined;
