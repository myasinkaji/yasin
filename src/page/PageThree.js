import React from 'react';
import {makeStyles, Paper} from "@material-ui/core";

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
        <Paper className={classes.paper}>This is page threeeeeeeeeeeee</Paper>
    );

}

export default PageOne;