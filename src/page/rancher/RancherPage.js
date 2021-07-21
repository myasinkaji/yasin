import React, {useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import RancherSearchForm from "./RancherSearchForm";
import RancherForm from "./RancherForm";
import Dialog from "../../component/Dialog";
import RancherTable from "./RancherTable";
import * as Service from '../../service/rancher/RancherService';
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


const RancherPage = () => {
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

    const submitAware = (rancher) => {
        dialogClose();
        loadPage(Service.DEFAULT_PAGE_REQUEST);
        setNotify(BaseService.getSuccessMessageObject(`${rancher.code} is registered Successfully`));
    }

    function dialogClose() {
        setRecord(Service.INITIAL_RANCHER);
        setOpen(false);
    }

    function onDeleteClick(rancher) {
        setConfirmDialog({
            isOpen: true,
            title: `Are you sure to delete rancher: ${rancher.name}?`,
            subTitle: "You can't undo this operation",
            onConfirm: () => removeRancher(rancher)
        });
    }

    function removeRancher(rancher) {
        Service.remove(rancher.nationalCode).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getWarningMessageObject(`${rancher.nationalCode} is deleted Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${rancher.nationalCode} can not be delete. ${e.message}`));
        });
    }

    function onEditClick(rancher) {
        setRecord(rancher);
        setOpen(true);
    }

    return (
        <>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Rancher Form'
                    subtitle='rancher subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <RancherSearchForm setOpen={setOpen} searchAction={onSearchClick} setNotify={setNotify}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <RancherTable pageData={page} onEditClick={onEditClick}
                                  onDeleteClick={onDeleteClick} loadPage={loadPage}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <RancherForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>
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

export default RancherPage;