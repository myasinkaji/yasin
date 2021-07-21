import RestService from "./rest/RestService";
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import PetsIcon from '@material-ui/icons/Pets';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LabelIcon from '@material-ui/icons/Label';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';

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
    {title: 'Central Guild', to: '/central-guild', icon:<ApartmentIcon /> },
    {title: 'Province Guild', to: '/province-guild', icon:<BusinessIcon /> },
    {title: 'Country Division', to: '/country-division', icon:<LocationOnIcon /> },
    {title: 'Contractor', to: '/contractor', icon:<SupervisorAccountIcon /> },
    {title: 'agent', to: '/agent', icon:<TransferWithinAStationIcon /> },
    {title: 'Subunit Activity', to: '/subunitactivity', icon:<LocalActivityIcon /> },
    {title: 'Subunit', to: '/subunit', icon:<AcUnitIcon /> },
    {title: 'Herd', to: '/herd', icon:<PetsIcon /> },
    {title: 'Tag Company', to: '/tag-company', icon:<LabelIcon /> }
]


export const IDENTITY_LINKS = [
    {title: 'Information', to: '/identityInformation', icon:<InfoIcon />},
    {title: 'Delete', to: '/deleteIdentity', icon:<DeleteIcon />},
    {title: 'Transport', to: '/transportIdentity', icon:<SendIcon />},
    {title: 'Edit', to: '/editIdentity', icon:<EditIcon />},
]