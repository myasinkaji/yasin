import React, {useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import AgentContractorAssignmentForm from "./AgentContractorAssignmentForm";
import Dialog from "../../component/Dialog";
import * as Service from '../../service/subunit/SubunitService';
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


const AgentContractorAssignmentPage = () => {
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

    const submitAware = (subunit) => {
        dialogClose();
        loadPage(Service.DEFAULT_PAGE_REQUEST);
        setNotify(BaseService.getSuccessMessageObject(`${subunit.code} is registered Successfully`));
    }

    function dialogClose() {
        setRecord(Service.INITIAL_SUBUNIT);
        setOpen(false);
    }

    function onDeleteClick(subunit) {
        setConfirmDialog({
            isOpen: true,
            title: `Are you sure to delete subunit: ${subunit.name}?`,
            subTitle: "You can't undo this operation",
            onConfirm: () => removeSubunit(subunit)
        });
    }

    function removeSubunit(subunit) {
        Service.remove(subunit.id).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getWarningMessageObject(`${subunit.id} is deleted Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${subunit.id} can not be delete. ${e.message}`));
        });
    }

    function onEditClick(subunit) {
        setRecord(subunit);
        setOpen(true);
    }

    return (
        <>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Subunit Form'
                    subtitle='subunit subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <AgentContractorAssignmentForm setOpen={setOpen} searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <AgentContractorAssignmentForm setOpen={setOpen} searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    {/*<SubunitTable pageData={page} onEditClick={onEditClick}
                                  onDeleteClick={onDeleteClick} loadPage={loadPage}/>*/}
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                {/*<SubunitForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>*/}
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

export default AgentContractorAssignmentPage;