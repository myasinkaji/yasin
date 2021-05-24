import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CentralGuildSearchForm from "./CentralGuildSearchForm";
import CentralGuildForm from "./CentralGuildForm";
import Dialog from "../../component/Dialog";
import CentralGuildTable from "./CentralGuildTable";
import * as Service from '../../service/centralGuild/CentralGuildService';
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
}));


const CentralGuildPage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState(undefined);
    const [page, setPage] = useState(Constants.EMPTY_PAGE);
    const [notify, setNotify] = useState({isOpen: false, title: '', message: '', type: ''});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})

    useEffect(() => {
        loadPage();
    }, []);

    const loadPage = () => {
        const promise = Service.getPage(Service.DEFAULT_PAGE_REQUEST);
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
            }).catch(error => {
            setNotify(BaseService.getErrorMessageObject(`Error Code: ${error.status}, Message: ${error.message}`))
        });
    }

    const submitAware = (guild) => {
        dialogClose();
        loadPage();
        setNotify(BaseService.getSuccessMessageObject(`${guild.code} is registered Successfully`));
    }

    function dialogClose() {
        setRecord(Service.INITIAL_GUILD);
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
            loadPage();
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
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Central-Guild Form'
                    subtitle='central-guild subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CentralGuildSearchForm setOpen={setOpen} searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CentralGuildTable page={page} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <CentralGuildForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>
            </Dialog>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
}

export default CentralGuildPage;