import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/herd';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')
const LAZY_ADDRESS = BASE_ADDRESS.concat('/lazy')

export const HERD_SEARCH_CRITERIA = {
    code: '',
    epidemiologicCode: '',
    postalCode: '',
    name: '',
    lng: '',
    lat: '',
    countryDivisionId: '',
    contractorNationalCode: '',};

export const INITIAL_HERD = {
    code: '',
    epidemiologicCode: '',
    postalCode: '',
    name: '',
    lng: '',
    lat: '',
    countryDivisionId: '',
    contractorNationalCode: '',
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

export function remove(herdCode) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('code=')
        .concat(herdCode);
    return RestService.delete(url);
}

export function save(herd) {
    return RestService.post(BASE_ADDRESS, herd);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(herd, setErrors) {
    const errors = {};
    errors.code = isBlank(String(herd.code)) ? 'code is required' : '';
    errors.epidemiologicCode = isBlank(herd.epidemiologicCode) ? 'epidemiologic Code is required' : '';
    errors.postalCode = isBlank(String(herd.postalCode)) ? 'postal code is required' : '';
    errors.name = isBlank(herd.name) ? 'name is required' : '';
    errors.lng = isBlank(String(herd.lng)) ? 'lng is required' : '';
    errors.lat = isBlank(String(herd.lat)) ? 'lat is required' : '';
    errors.countryDivisionId = isBlank(String(herd.countryDivisionId)) ? 'country division is required' : '';
    errors.contractorNationalCode = isBlank(String(herd.contractorNationalCode)) ? 'contractor is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();

export const getContractorOf = herd => herd.provinceGuildCode ?
        {id: herd.contractorNationalCode, title: herd.contractorName} : undefined;

export const getCountryDivision = herd => herd.countryDivisionId ?
    {id: herd.countryDivisionId, title: herd.countryDivisionName} : undefined;
