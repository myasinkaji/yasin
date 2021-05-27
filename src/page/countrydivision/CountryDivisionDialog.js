import React, {useEffect, useState} from 'react';
import Dialog from "../../component/Dialog";
import TreeView from "../../component/TreeView";
import * as Service from "../../service/countrydivision/CountryDivisionService";
import * as BaseService from "../../service/BaseService";
import {makeStyles} from "@material-ui/core/styles";
import {DialogActions, DialogContent, Grid} from "@material-ui/core";
import Button from "../../component/controls/Button";

const useStyles = makeStyles(theme => ({
    content: {
        minHeight: theme.spacing(10)
    }
}));

const CountryDivisionDialog = (props) => {
    const classes = useStyles();
    const {open, setOpen, setNotify, setSelected} = props;
    const [tree, setTree] = useState({name: '', code: '', children: []});

    useEffect(() => {
        Service.getTree().then(response => {
            setTree(response.data);
        }).catch(error => {
            setNotify(BaseService.getErrorMessageObject(error.getMessage));
        });
    }, []);

    function close() {
        setSelected(undefined);
        setOpen(false)
    }

    function select() {
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={close} title='Country Divisions'>
            <DialogContent className={classes.content}>
                <TreeView setSelected={setSelected} tree={tree}/>
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Button label='Close' onClick={close} color='secondary' type='reset'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button label='Select' onClick={select} type='submit'/>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default CountryDivisionDialog;