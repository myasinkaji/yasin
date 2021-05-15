import RestService from "./rest/RestService";

export function getPage(page, pageSize) {
    RestService.get('/cg')
}
