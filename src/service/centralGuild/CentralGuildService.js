import RestService from "../rest/RestService";

const address = '/cg';
export const INITIAL_GUILD = {
    uniqueId: '',
    code: '',
    managerName: '',
    name: '',
    postalCode: '',
    active: false,
    phone: '',
    mobile: ''
}

export function getPage(page, pageSize, order, orderBy) {
    const url = address
        .concat('?page=')
        .concat(page)
        .concat('&pageSize=')
        .concat(pageSize)
        .concat('&order=')
        .concat(order)
        .concat('&orderBy=')
        .concat(orderBy);
    return RestService.get(url)
}

export function save(guild) {
    RestService.post(address, guild);
}

export function validate(guild, setErrors) {
    const errors = {};
    errors.code = isBlank(String(guild.code)) ? 'code is required' : '';
    errors.name = isBlank(guild.name) ? 'name is required' : '';
    errors.uniqueId = isBlank(String(guild.uniqueId)) ? 'unique id is required' : '';
    errors.postalCode = isBlank(String(guild.postalCode)) ? 'postal code is required' : '';
    errors.managerName = isBlank(guild.managerName) ? 'manager name is required' : '';
    errors.phone = isBlank(guild.phone) ? 'phone is required' : '';
    errors.mobile = isBlank(guild.mobile) ? 'mobile is required' : '';

    setErrors({...errors})
    return Object.values(errors).every(isBlank);
}

const isBlank = message => !message.trim();