import React, {useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import AgentSearchForm from "./AgentSearchForm";
import AgentForm from "./AgentForm";
import Dialog from "../../component/Dialog";
import AgentTable from "./AgentTable";
import * as Service from '../../service/agent/AgentService';
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


const AgentPage = () => {
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

    const submitAware = (agent) => {
        dialogClose();
        loadPage(Service.DEFAULT_PAGE_REQUEST);
        setNotify(BaseService.getSuccessMessageObject(`${agent.code} is registered Successfully`));
    }

    function dialogClose() {
        setRecord(undefined);
        setOpen(false);
    }

    function onDeleteClick(agent) {
        setConfirmDialog({
            isOpen: true,
            title: `Are you sure to delete agent: ${agent.name}?`,
            subTitle: "You can't undo this operation",
            onConfirm: () => removeAgent(agent)
        });
    }

    function removeAgent(agent) {
        Service.remove(agent.nationalCode).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getWarningMessageObject(`${agent.nationalCode} is deleted Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${agent.nationalCode} can not be delete. ${e.message}`));
        });
    }

    function onEditClick(agent) {
        setRecord(agent);
        setOpen(true);
    }

    return (
        <>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Agent Form'
                    subtitle='agent subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <AgentSearchForm setOpen={setOpen} searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <AgentTable pageData={page} onEditClick={onEditClick}
                                onDeleteClick={onDeleteClick} loadPage={loadPage}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <AgentForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>
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

export default AgentPage;