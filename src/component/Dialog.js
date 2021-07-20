import React from 'react';
import {Dialog as MuiDialog, DialogTitle, IconButton, makeStyles, Typography} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    //todo set width & height based on device screen
    paper: {
        [theme.breakpoints.up('xs')]: {
            minWidth: theme.spacing(40),
            minHeight: theme.spacing(80)
        },
        [theme.breakpoints.up('sm')]: {
            minWidth: theme.spacing(80),
            minHeight: theme.spacing(30)
        },
    },
    dialogTitle: {
        backgroundColor: theme.palette.secondary.dark,
        alignItems: 'center'
    },
    closeIcon: {
        float: 'right'
    },
}));

const Dialog = (props) => {
    const classes = useStyles();
    const {open, onClose, title} = props;

    return (
        <MuiDialog classes={{paper: classes.paper}} open={open}>
            <DialogTitle className={classes.dialogTitle}>
                <Typography component='span' variant='h6'>{title}</Typography>
                <IconButton className={classes.closeIcon} size='small' onClick={onClose}>
                    <CancelIcon/>
                </IconButton>
            </DialogTitle>
            {props.children}
        </MuiDialog>
    );
}

export default Dialog;