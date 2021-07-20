import React, {useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Dialog from "../../component/Dialog";
import Notification from "../../component/Notification";
import ConfirmDialog from "../../component/ConfirmDialog";
import * as Service from "../../service/subunit_activity/SubUnitActivityService";
import * as BaseService from "../../service/BaseService";
import * as Constants from "../../service/Constants";
import SubUnitActivityForm from "./SubUnitActivityForm";
import SubUnitActivityTable from "./SubUnitActivityTable";
import SubUnitActivitySearchForm from "./SubUnitActivitySearchForm";


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


const SubUnitActivityPage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(Constants.EMPTY_PAGE);
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, title: '', message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [record, setRecord] = useState(undefined);

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

    function onEditClick(activity) {
        setRecord(activity);
        setOpen(true);
    }

    function onDeleteClick(activity) {
        setConfirmDialog({
            isOpen: true,
            title: 'Are you sure to delete this record?',
            subTitle: "You can't undo this operation",
            onConfirm: () => removeActivity(activity)
        });
    }

    function removeActivity(activity) {
        Service.remove(activity.code).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getWarningMessageObject(`${activity.code} is deleted Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${activity.code} can not be delete. ${e.message}`));
        });
    }

    function dialogClose() {
        setRecord(Service.INITIAL_ACTIVITY);
        setOpen(false);
    }

    const submitAware = (activity) => {
        dialogClose();
        loadPage(Service.DEFAULT_PAGE_REQUEST);
        setNotify(BaseService.getSuccessMessageObject(`${activity.code} is registered Successfully`));
    }


    return (
        <>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='SubUnit Form'
                    subtitle='SubUnit subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <SubUnitActivitySearchForm setOpen={setOpen} searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <SubUnitActivityTable pageData={page} onEditClick={onEditClick}
                                          onDeleteClick={onDeleteClick} loadPage={loadPage}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <SubUnitActivityForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>
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

export default SubUnitActivityPage;