import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/rancher/RancherService';
import * as CountryDivisionService from '../../service/countrydivision/CountryDivisionService';
import * as ProvinceGuildService from '../../service/provinceGuild/ProvinceGuildService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import AutoComplete from "../../component/controls/AutoComplete";


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const RancherForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_CONTRACTOR;
    const [guild, setGuild] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [countryDivisions, setCountryDivisions] = useState([]);
    const [provinceGuilds, setProvinceGuilds] = useState([]);

    useEffect(() => {
        CountryDivisionService.getLazy()
            .then(response => setCountryDivisions(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));

        ProvinceGuildService.getLazy()
            .then(response => setProvinceGuilds(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));
    }, []);

    function onchange(event) {
        const {name, value} = event.target;
        setGuild({
            ...guild,
            [name]: value,
        });
    }

    function register() {
        if (Service.validate(guild, setErrors)) {
            Service.save(guild).then(() => {
                submitAware(guild);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setGuild(initialValue);
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
                                       value={guild.firstname}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.lastname}
                                       onChange={onchange}
                                       name='lastname'
                                       label='Lastname'
                                       value={guild.lastname}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.nationalCode}
                                       onChange={onchange}
                                       name='nationalCode'
                                       label='National Code'
                                       value={guild.nationalCode}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.postalCode}
                                       onChange={onchange}
                                       name='postalCode'
                                       label='Postal Code'
                                       value={guild.postalCode}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.uniqueId}
                                       onChange={onchange}
                                       name='uniqueId'
                                       label='Unique Id'
                                       value={guild.uniqueId}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.code}
                                       onChange={onchange}
                                       name='code'
                                       label='Code'
                                       value={guild.code}/>
                        </Grid>

                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>

                        <Grid item xs={12}>
                            <TextField error={errors.phone}
                                       onChange={onchange}
                                       name='phone'
                                       label='Phone'
                                       value={guild.phone}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.email}
                                       onChange={onchange}
                                       name='email'
                                       label='Email'
                                       value={guild.email}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.birthDate}
                                       onChange={onchange}
                                       name='birthDate'
                                       label='Birth Date'
                                       value={guild.birthDate}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.companyName}
                                       onChange={onchange}
                                       name='companyName'
                                       label='Company Name'
                                       value={guild.companyName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.provinceGuildCode}
                                          value={Service.getProvinceGuildOf(guild)}
                                          data={provinceGuilds}
                                          onChange={onchange}
                                          name='provinceGuildCode'
                                          label='Province Guild'/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.countryDivisionId}
                                          value={Service.getCountryDivision(guild)}
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

export default RancherForm;