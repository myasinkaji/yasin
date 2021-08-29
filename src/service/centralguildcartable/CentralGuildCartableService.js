import RestService from "../rest/RestService";
import * as BaseService from '../../service/BaseService';
import * as Constants from "../Constants";

const BASE_ADDRESS = '/tag-request';
const GUILD_CONFIRMATION = BASE_ADDRESS.concat('/guild-accept');
const SEARCH_ADDRESS = BASE_ADDRESS.concat('/search')

export const SEARCH_CRITERIA = {
    animalKind: '',
    tagType: '',
    count: '',
    tagCompanyId: '',
    centralGuildCode: '',
};

export const INITIAL_TAG_REQUEST = {
    animalKind: '',
    tagType: '',
    count: '',
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

export function getPage(pageRequest) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat(BaseService.getPageRequestURLParams(pageRequest))
    return RestService.get(url)
}

export function remove(id) {
    const url = BASE_ADDRESS
        .concat('?')
        .concat('id=')
        .concat(id);
    return RestService.delete(url);
}

export function save(tagRequest) {
    return RestService.post(BASE_ADDRESS, tagRequest);
}
export function confirm(tagRequest, confirm) {
    const object = {tagRequestId: tagRequest.id, confirm}
    return RestService.post(GUILD_CONFIRMATION, object);
}

export function search(pageRequest, searchCriteria) {
    return BaseService.search(SEARCH_ADDRESS, pageRequest, searchCriteria);
}

export function validate(tagRequest, setErrors) {
    const errors = {};
    errors.animalKind = tagRequest.animalKind === undefined || isBlank(String(tagRequest.animalKind)) ? 'Animal Kind is required' : '';
    errors.tagType = tagRequest.tagType === undefined  || isBlank(String(tagRequest.tagType)) ? 'Tag Type is required' : '';
    errors.count = !tagRequest.count || isBlank(String(tagRequest.count)) ? 'Count is required' : '';
    errors.tagCompanyId = !tagRequest.tagCompanyId || isBlank(String(tagRequest.tagCompanyId)) ? 'Tag Company is required' : '';
    errors.centralGuildCode = !tagRequest.centralGuildCode || isBlank(String(tagRequest.centralGuildCode)) ? 'Central Guild is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();

export const getGrade = agent => agent.gradeId ?
    {id: agent.gradeId, title: agent.gradeTitle} : undefined;

export const getCentralGuildOf = tagRequest => tagRequest.centralGuildCode ?
    {id: tagRequest.centralGuildCode, title: tagRequest.centralGuildName}: undefined;

export const getTagCompanyOf = tagRequest => tagRequest.tagCompanyId ?
        {id: tagRequest.tagCompanyId, title: tagRequest.tagCompanyName} : undefined;
