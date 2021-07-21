import React, {useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from "../../service/subunit_activity/SubUnitActivityService";
import * as BaseService from "../../service/BaseService";
import * as Constants from "../../service/Constants";


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));

const SubUnitActivityForm = props => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_ACTIVITY;
    const [activity, setActivity] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);


    function onchange(event) {
        const {name, value} = event.target;
        setActivity({
            ...activity,
            [name]: value,
        });
    }

    return (
        <>
            <DialogContent className={classes.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} spacing={3}>
                        <Grid item xs={12}>
                            <TextField error={errors.code}
                                       onChange={onchange} name='code' label='Code' value={activity.code}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.name}
                                       onChange={onchange} name='name' label='Name' value={activity.name}/>
                        </Grid>

                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Button label='Reset' color='secondary' onClick={reset} type='reset'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button label='Save Entity' onClick={register} type='submit'/>
                    </Grid>
                </Grid>
            </DialogActions>
        </>
    );

    function register() {
        if (Service.validate(activity, setErrors)) {
            Service.save(activity).then(() => {
                submitAware(activity);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setActivity(initialValue);
    }
}

export default SubUnitActivityForm;