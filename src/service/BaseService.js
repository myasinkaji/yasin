import RestService from "./rest/RestService";

export function search(url, pageRequest, searchCriteria) {
    const criteriaParams = Object.keys(searchCriteria)
        .map(key => key + '=' + searchCriteria[key])
        .reduce((concatenated, entry) => concatenated.concat('&').concat(entry));

    url = url.concat('?')
        .concat(getPageRequestURLParams(pageRequest))
        .concat('&')
        .concat(criteriaParams);

    console.log(url);
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
    return {
        title: 'Success',
        isOpen: true,
        type: 'success',
        message: message
    };
}
export function getErrorMessageObject(message) {
    return {
        title: 'Error',
        isOpen: true,
        type: 'error',
        message: message
    };
}