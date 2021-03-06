import React, {useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CountryDivisionSearchForm from "./CountryDivisionSearchForm";
import CountryDivisionForm from "./CountryDivisionForm";
import Dialog from "../../component/Dialog";
import CountryDivisionTable from "./CountryDivisionTable";
import * as Service from '../../service/countrydivision/CountryDivisionService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import Notification from "../../component/Notification";
import ConfirmDialog from "../../component/ConfirmDialog";
import CountryDivisionDialog from "./CountryDivisionDialog";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.warning.main
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));


const CountryDivisionPage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState(undefined);
    const [page, setPage] = useState(Constants.EMPTY_PAGE);
    const [notify, setNotify] = useState({isOpen: false, title: '', message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [loading, setLoading] = useState(false);
    const [selectedCD, setSelectedCD] = useState(undefined);
    const [openCDSelectDialog, setOpenCDSelectDialog] = useState(false);

    const loadPage = (pageRequest) => {
        setLoading(true)
        const promise = Service.getPage(pageRequest);
        setPageData(promise);
    }

    function onSearchClick(searchCriteria) {
        const promise = Service.search(Service.DEFAULT_PAGE_REQUEST, searchCriteria);
        setPageData(promise);
    }

    function setPageData(promise) {
        promise
            .then(response => {
                setPage(response.data);
                setLoading(false);
            }).catch(error => {
            setNotify(BaseService.getErrorMessageObject(`Error Code: ${error.status}, Message: ${error.message}`))
        });
    }

    const submitAware = (guild) => {
        dialogClose();
        loadPage(Service.DEFAULT_PAGE_REQUEST);
        setNotify(BaseService.getSuccessMessageObject(`${guild.code} is registered Successfully`));
    }

    function dialogClose() {
        setRecord(Service.INITIAL_COUNTRY_DIVISION);
        setOpen(false);
    }

    function onDeleteClick(guild) {
        setConfirmDialog({
            isOpen: true,
            title: 'Are you sure to delete this record?',
            subTitle: "You can't undo this operation",
            onConfirm: () => removeGuild(guild)
        });
    }

    function removeGuild(guild) {
        Service.remove(guild.code).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getWarningMessageObject(`${guild.code} is deleted Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${guild.code} can not be delete. ${e.message}`));
        });
    }

    function onEditClick(guild) {
        setRecord(guild);
        setOpen(true);
    }

    return (
        <>
            <CountryDivisionDialog open={openCDSelectDialog} setOpen={setOpenCDSelectDialog}
                                   setNotify={setNotify} setSelected={setSelectedCD}/>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Country Division Form'
                    subtitle='Country Division subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CountryDivisionSearchForm setOpen={setOpen}
                                               setOpenCDTree={setOpenCDSelectDialog}
                                               searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CountryDivisionTable pageData={page} onEditClick={onEditClick}
                                          onDeleteClick={onDeleteClick} loadPage={loadPage}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <CountryDivisionForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>
            </Dialog>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="secondary"/>
            </Backdrop>
        </>
    );
}

export default CountryDivisionPage;