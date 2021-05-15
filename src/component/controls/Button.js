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
    const {label, icon} = props;
    return (
        <MuiButton
            size='small'
            className={classes.root}
            variant='contained'
            fullWidth
            {...props}
            startIcon={icon}
        >{label}</MuiButton>
    );
}

export default Button;