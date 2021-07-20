import RestService from "../rest/RestService";
import * as BaseService from '../BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/pg';
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')
const LAZY_ADDRESS = BASE_ADDRESS.concat('/lazy')

export const GUILD_SEARCH_CRITERIA = {
    uniqueId: '',
    code: '',
    name: '',
    countryDivisionId: '',
    centralGuildCode: '',
    active: false,
    phone: '',
    mobile: ''
};

export const INITIAL_GUILD = {
    uniqueId: '',
    code: '',
    countryDivisionId: '',
    centralGuildCode: '',
    managerName: '',
    name: '',
    postalCode: '',
    active: false,
    phone: '',
    mobile: ''
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
export function remove(guildCode) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('code=')
        .concat(guildCode);
    return RestService.delete(url);
}
export function save(guild) {
    return RestService.post(BASE_ADDRESS, guild);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(guild, setErrors) {
    const errors = {};
    errors.code = isBlank(String(guild.code)) ? 'code is required' : '';
    errors.name = isBlank(guild.name) ? 'name is required' : '';
    errors.uniqueId = isBlank(String(guild.uniqueId)) ? 'unique id is required' : '';
    errors.countryDivisionId = isBlank(String(guild.countryDivisionId)) ? 'country division is required' : '';
    errors.centralGuildCode = isBlank(String(guild.centralGuildCode)) ? 'central guild is required' : '';
    errors.postalCode = isBlank(String(guild.postalCode)) ? 'postal code is required' : '';
    errors.managerName = isBlank(guild.managerName) ? 'manager name is required' : '';
    errors.phone = isBlank(guild.phone) ? 'phone is required' : '';
    errors.mobile = isBlank(guild.mobile) ? 'mobile is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();