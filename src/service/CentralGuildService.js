import RestService from "./rest/RestService";

export function getPage(page, pageSize, order, orderBy) {
    const url = '/cg?page='
        .concat(page)
        .concat('&pageSize=')
        .concat(pageSize)
        .concat('&order=')
        .concat(order)
        .concat('&orderBy=')
        .concat(orderBy);
    return RestService.get(url)
}
