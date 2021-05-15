import React from 'react';
import {Button, Grid, makeStyles, Paper} from "@material-ui/core";
import * as Service from '../../service/CentralGuildService';
import PageHeader from "../../component/PageHeader";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.light
    },
}));

const CentralGuildForm = () => {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12}>
                <PageHeader/>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>This is Central-Guild page</Paper>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {Service.getPage(1, 10)}}>Get Page...</Button>
            </Grid>
        </>
    );
}

export default CentralGuildForm;