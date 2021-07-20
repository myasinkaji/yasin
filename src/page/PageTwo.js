import React from 'react';
import {Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../component/PageHeader";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.light
    },
}));
function PageOne() {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12}>
                <PageHeader/>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>This is page twoooo</Paper>
            </Grid>
        </>
    );

}

export default PageOne;