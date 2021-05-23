import React from 'react';
import {Snackbar} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    alert: {
        top: theme.spacing(9)
    }
}));

export default function Notification(props) {
    const {notify, setNotify} = props;
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setNotify({...notify, isOpen: false})
    }

    return (
        <Snackbar
            className={classes.alert}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={notify.isOpen}
            autoHideDuration={5000}
            onClose={handleClose}>
            <Alert
                variant={'filled'}
                severity={notify.type}
                onClose={handleClose}>
                <AlertTitle>{notify.title}</AlertTitle>
                {notify.message}
            </Alert>
        </Snackbar>
    );

}