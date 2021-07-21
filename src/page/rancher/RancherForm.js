import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/rancher/RancherService';
import * as CountryDivisionService from '../../service/countrydivision/CountryDivisionService';
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


const RancherForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_RANCHER;
    const [rancher, setRancher] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [countryDivisions, setCountryDivisions] = useState([]);

    useEffect(() => {
        CountryDivisionService.getLazy()
            .then(response => setCountryDivisions(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));
    }, []);

    function onchange(event) {
        const {name, value} = event.target;
        setRancher({
            ...rancher,
            [name]: value,
        });
    }

    function register() {
        if (Service.validate(rancher, setErrors)) {
            Service.save(rancher).then(() => {
                submitAware(rancher);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setRancher(initialValue);
    }

    return (
        <>
            <DialogContent className={classes.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <TextField error={errors.firstname}
                                       onChange={onchange}
                                       name='firstname'
                                       label='Firstname'
                                       value={rancher.firstname}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.lastname}
                                       onChange={onchange}
                                       name='lastname'
                                       label='Lastname'
                                       value={rancher.lastname}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.nationalCode}
                                       onChange={onchange}
                                       name='nationalCode'
                                       label='National Code'
                                       value={rancher.nationalCode}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.companyName}
                                       onChange={onchange}
                                       name='companyName'
                                       label='Company Name'
                                       value={rancher.companyName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.companyNationalId}
                                       onChange={onchange}
                                       name='companyNationalId'
                                       label='Company National Code'
                                       value={rancher.companyNationalId}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.postalCode}
                                       onChange={onchange}
                                       name='postalCode'
                                       label='Postal Code'
                                       value={rancher.postalCode}/>
                        </Grid>

                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>

                        <Grid item xs={12}>
                            <TextField error={errors.phone}
                                       onChange={onchange}
                                       name='phone'
                                       label='Phone'
                                       value={rancher.phone}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.mobile}
                                       onChange={onchange}
                                       name='mobile'
                                       label='Mobile'
                                       value={rancher.mobile}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.birthDate}
                                       onChange={onchange}
                                       name='birthDate'
                                       label='Birth Date'
                                       value={rancher.birthDate}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.companyName}
                                       onChange={onchange}
                                       name='companyName'
                                       label='Company Name'
                                       value={rancher.companyName}/>
                        </Grid>

                        <Grid item xs={12}>
                            <AutoComplete error={errors.countryDivisionId}
                                          value={Service.getCountryDivision(rancher)}
                                          data={countryDivisions}
                                          onChange={onchange}
                                          name='countryDivisionId'
                                          label='Country Division'/>
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                name='legal'
                                label="Is Legal"
                                checked={rancher.legal}
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

export default RancherForm;