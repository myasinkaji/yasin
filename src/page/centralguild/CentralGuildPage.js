import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CentralGuildSearchForm from "./CentralGuildSearchForm";
import CentralGuildForm from "./CentralGuildForm";
import Dialog from "../../component/Dialog";
import CentralGuildTable from "./CentralGuildTable";
import * as Service from '../../service/centralGuild/CentralGuildService';

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
    const [page, setPage] = useState({data: [], count: 0});

    useEffect(() => {
        loadPage();
    }, []);

    const loadPage = () => {
        Service.getPage(0, 5, 'asc', 'code').then(response => {
            setPage(response.data);
        }).catch(error => {
            //todo handle error
            console.err(error);
        });
    }
    const submitAware = () => {
        setInterval(() => {
            loadPage()
        }, 1000)
    }

    function dialogClose() {
        setRecord(Service.initialValue);
        setOpen(false);
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
                    <CentralGuildSearchForm setOpen={setOpen}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <CentralGuildTable page={page} setRecord={setRecord} setOpen={setOpen}/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' onClose={dialogClose} open={open}>
                <CentralGuildForm submitAware={submitAware} recordForUpdate={record} setOpen={setOpen}/>
            </Dialog>
        </>
    );
}

export default CentralGuildPage;