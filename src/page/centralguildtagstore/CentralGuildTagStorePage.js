import React, {useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CentralGuildTagStoreSearchForm from "./CentralGuildTagStoreSearchForm";
import CentralGuildTagStoreForm from "./CentralGuildTagStoreForm";
import Dialog from "../../component/Dialog";
import CentralGuildTagStoreTable from "./CentralGuildTagStoreTable";
import * as Service from '../../service/centralguildcartable/CentralGuildCartableService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import Notification from "../../component/Notification";
import ConfirmDialog from "../../component/ConfirmDialog";

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


const CentralGuildTagStorePage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState(undefined);
    const [page, setPage] = useState(Constants.EMPTY_PAGE);
    const [notify, setNotify] = useState({isOpen: false, title: '', message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [loading, setLoading] = useState(false);

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

    const submitAware = (tagRequest) => {
        dialogClose();
        loadPage(Service.DEFAULT_PAGE_REQUEST);
        setNotify(BaseService.getSuccessMessageObject(`${tagRequest.code} is registered Successfully`));
    }

    function dialogClose() {
        setRecord(Service.INITIAL_TAG_REQUEST);
        setOpen(false);
    }

    function confirm(tagRequest) {
        Service.confirm(tagRequest, true).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getSuccessMessageObject(`${tagRequest.code} is confirmed Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${tagRequest.code} can not be delete. ${e.message}`));
        });
    }

    function reject(tagRequest) {
        Service.confirm(tagRequest, false).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getWarningMessageObject(`${tagRequest.code} is rejected Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${tagRequest.code} can not be delete. ${e.message}`));
        });
    }

    return (
        <>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Central Guild Cartable'
                    subtitle='central guild cartable subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CentralGuildTagStoreSearchForm setOpen={setOpen} searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CentralGuildTagStoreTable pageData={page} confirm={confirm}
                                               reject={reject} loadPage={loadPage}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <CentralGuildTagStoreForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>
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

export default CentralGuildTagStorePage;