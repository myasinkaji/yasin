import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/subunit/SubunitService';
import * as HerdService from '../../service/herd/HerdService';
import * as ActivityService from '../../service/subunit_activity/SubUnitActivityService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import AutoComplete from "../../component/controls/AutoComplete";
import Checkbox from "../../component/controls/Checkbox";


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const SubunitForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_SUBUNIT;
    const [subunit, setSubunit] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [herds, setHerds] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        HerdService.getLazy()
            .then(response => setHerds(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));

        ActivityService.getLazy()
            .then(response => setActivities(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));
    }, []);

    function onchange(event) {
        const {name, value} = event.target;
        setSubunit({
            ...subunit,
            [name]: value,
        });
    }

    function register() {
        if (Service.validate(subunit, setErrors)) {
            Service.save(subunit).then(() => {
                submitAware(subunit);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setSubunit(initialValue);
    }

    return (
        <>
            <DialogContent className={classes.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <TextField error={errors.uniqueId}
                                       onChange={onchange}
                                       name='uniqueId'
                                       label='Unique Id'
                                       value={subunit.uniqueId}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.capacity}
                                       onChange={onchange}
                                       name='capacity'
                                       label='Capacity'
                                       value={subunit.capacity}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.licenseNumber}
                                       onChange={onchange}
                                       name='licenseNumber'
                                       label='License Number'
                                       value={subunit.licenseNumber}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.licenseIssueDate}
                                       onChange={onchange}
                                       name='licenseIssueDate'
                                       label='License Issue Date'
                                       value={subunit.licenseIssueDate}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.licenseExpireDate}
                                       onChange={onchange}
                                       name='licenseExpireDate'
                                       label='License Expire Date'
                                       value={subunit.licenseExpireDate}/>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>


                        <Grid item xs={12}>
                            <AutoComplete error={errors.activityCode}
                                          value={Service.getActivityOf(subunit)}
                                          data={activities}
                                          onChange={onchange}
                                          name='activityCode'
                                          label='Activity'/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.herdCode}
                                          value={Service.getHerdOf(subunit)}
                                          data={herds}
                                          onChange={onchange}
                                          name='herdCode'
                                          label='Herd'/>
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                name='active'
                                label="Is Active"
                                checked={subunit.active}
                                onChange={onchange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                name='hasLicense'
                                label="Has License"
                                checked={subunit.hasLicense}
                                onChange={onchange}
                            />
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
}

export default SubunitForm;