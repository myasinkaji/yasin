import React, {useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CompanyCartableSearchForm from "./CompanyCartableSearchForm";
import CompanyCartableForm from "./CompanyCartableForm";
import Dialog from "../../component/Dialog";
import CompanyCartableTable from "./CompanyCartableTable";
import * as Service from '../../service/tagrequest/TagRequestService';
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


const CompanyCartablePage = () => {
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

    function onDeleteClick(tagRequest) {
        setConfirmDialog({
            isOpen: true,
            title: `Are you sure to delete tag request: ${tagRequest.name}?`,
            subTitle: "You can't undo this operation",
            onConfirm: () => removeTagRequest(tagRequest)
        });
    }

    function removeTagRequest(tagRequest) {
        Service.remove(tagRequest.code).then(() => {
            loadPage(Service.DEFAULT_PAGE_REQUEST);
            setNotify(BaseService.getWarningMessageObject(`${tagRequest.code} is deleted Successfully`));
        }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`${tagRequest.code} can not be delete. ${e.message}`));
        });
    }

    function onEditClick(tagRequest) {
        setRecord(tagRequest);
        setOpen(true);
    }

    return (
        <>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Tag Request Form'
                    subtitle='tag request subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CompanyCartableSearchForm setOpen={setOpen} searchAction={onSearchClick}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CompanyCartableTable pageData={page} onEditClick={onEditClick}
                                          onDeleteClick={onDeleteClick} loadPage={loadPage}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <CompanyCartableForm submitAware={submitAware} recordForUpdate={record} setNotify={setNotify}/>
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

export default CompanyCartablePage;