import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/herd/HerdService';
import * as CountryDivisionService from '../../service/countrydivision/CountryDivisionService';
import * as ContractorService from '../../service/contractor/ContractorService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import AutoComplete from "../../component/controls/AutoComplete";


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const HerdForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_HERD;
    const [herd, setHerd] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [countryDivisions, setCountryDivisions] = useState([]);
    const [contractors, setContractors] = useState([]);

    useEffect(() => {
        CountryDivisionService.getLazy()
            .then(response => setCountryDivisions(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));

        ContractorService.getLazy()
            .then(response => setContractors(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));
    }, []);

    function onchange(event) {
        const {name, value} = event.target;
        setHerd({
            ...herd,
            [name]: value,
        });
    }

    function register() {
        if (Service.validate(herd, setErrors)) {
            Service.save(herd).then(() => {
                submitAware(herd);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setHerd(initialValue);
    }

    return (
        <>
            <DialogContent className={classes.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <TextField error={errors.code}
                                       onChange={onchange}
                                       name='code'
                                       label='Code'
                                       value={herd.code}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.epidemiologicCode}
                                       onChange={onchange}
                                       name='epidemiologicCode'
                                       label='Epidemiologic Code'
                                       value={herd.epidemiologicCode}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.postalCode}
                                       onChange={onchange}
                                       name='postalCode'
                                       label='Postal Code'
                                       value={herd.postalCode}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.name}
                                       onChange={onchange}
                                       name='name'
                                       label='Name'
                                       value={herd.name}/>
                        </Grid>


                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <TextField error={errors.lng}
                                       onChange={onchange}
                                       name='lng'
                                       label='Lng'
                                       value={herd.lng}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.lat}
                                       onChange={onchange}
                                       name='lat'
                                       label='Lat'
                                       value={herd.lat}/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.contractorNationalCode}
                                          value={Service.getContractorOf(herd)}
                                          data={contractors}
                                          onChange={onchange}
                                          name='contractorNationalCode'
                                          label='Contractor'/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.countryDivisionId}
                                          value={Service.getCountryDivision(herd)}
                                          data={countryDivisions}
                                          onChange={onchange}
                                          name='countryDivisionId'
                                          label='Country Division'/>
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

export default HerdForm;