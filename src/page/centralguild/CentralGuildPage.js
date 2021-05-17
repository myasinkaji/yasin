import React, {useState} from 'react';
import {Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CentralGuildSearchForm from "./CentralGuildSearchForm";
import CentralGuildForm from "./CentralGuildForm";
import Dialog from "../../component/Dialog";
import CentralGuildTable from "./CentralGuildTable";

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
                    <CentralGuildTable/>
                </Paper>
            </Grid>
            <Dialog title='Insert new' open={open} setOpen={setOpen}>
                <CentralGuildForm setOpen={setOpen}/>
            </Dialog>
        </>
    );
}

export default CentralGuildPage;