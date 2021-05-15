import React from 'react';
import {IconButton, makeStyles, Paper, Toolbar} from "@material-ui/core";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.dark
    },
}));
const PageHeader = () => {
    const classes = useStyles();

    return (
        <Paper>
            <Toolbar color={"primary"}>
                <IconButton>
                    <PeopleOutlineIcon/>
                </IconButton>
                <Paper className={classes.paper}>Page header goes here</Paper>
            </Toolbar>
        </Paper>

    );
}

export default PageHeader;