import RestService from "./rest/RestService";

export function search(url, pageRequest, searchCriteria) {
    const criteriaParams = Object.keys(searchCriteria)
        .map(key => key + '=' + searchCriteria[key])
        .reduce((concatenated, entry) => concatenated.concat('&').concat(entry));

    url = url.concat('?')
        .concat(getPageRequestURLParams(pageRequest))
        .concat('&')
        .concat(criteriaParams);

    return RestService.get(url)
}

export function getPageRequestURLParams(pageRequest) {
    return 'page='
        .concat(pageRequest.page)
        .concat('&pageSize=')
        .concat(pageRequest.pageSize)
        .concat('&order=')
        .concat(pageRequest.order)
        .concat('&orderBy=')
        .concat(pageRequest.orderBy)
}

export function getSuccessMessageObject(message) {
    return getMessage('Success', 'success', message);
}

export function getInfoMessageObject(message) {
    return getMessage('Info', 'info', message);
}

export function getWarningMessageObject(message) {
    return getMessage('Warning', 'warning', message);
}

export function getErrorMessageObject(message) {
    return getMessage('Error', 'error', message);
}

function getMessage(title, type, message) {
    return {
        title,
        type,
        message,
        isOpen: true
    };
}

export const BASIC_INFORMATION_LINKS = [
    {title: 'Central Guild', to: '/central-guild'},
    {title: 'Province Guild', to: '/province-guild'},
    {title: 'Country Division', to: '/country-division'},
    {title: 'Tag Company', to: '/tag-company'},
    {title: 'Contractor', to: '/contractor'},
]