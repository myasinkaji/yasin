import React from 'react';
import {Button as MuiButton, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        width: '90%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    }
}));
const Button = (props) => {
    const classes = useStyles();
    const {label, icon, onClick, ...other} = props;
    return (
        <MuiButton
            size='small'
            color='primary'
            variant='contained'
            fullWidth
            className={classes.root}
            startIcon={icon}
            onClick={onClick}
            {...other}
        >{label}</MuiButton>
    );
}

export default Button;