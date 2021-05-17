import React from 'react';
import {Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle, makeStyles} from '@material-ui/core'
import Button from "./controls/Button";

const useStyles = makeStyles(theme => ({
    root: {
    }
}));

const Dialog = (props) => {
    const classes = useStyles();
    const {open, setOpen, title} = props;

    return (
        <MuiDialog open={open} className={classes.root}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button label='Save Entity'
                        onClick={() => setOpen(false)}
                />
            </DialogActions>
        </MuiDialog>
    );
}

export default Dialog;