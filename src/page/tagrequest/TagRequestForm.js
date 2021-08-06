import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/agent/AgentService';
import * as GradeService from '../../service/grade/GradeService';
import * as CountryDivisionService from '../../service/countrydivision/CountryDivisionService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import AutoComplete from "../../component/controls/AutoComplete";


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const TagRequestForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_AGENT;
    const [agent, setAgent] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [countryDivisions, setCountryDivisions] = useState([]);

    useEffect(() => {
        CountryDivisionService.getLazy()
            .then(response => setCountryDivisions(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));

    }, []);

    function onchange(event) {
        const {name, value} = event.target;
        setAgent({
            ...agent,
            [name]: value,
        });
    }

    function register() {
        if (Service.validate(agent, setErrors)) {
            Service.save(agent).then(() => {
                submitAware(agent);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setAgent(initialValue);
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
                                       value={agent.firstname}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.lastname}
                                       onChange={onchange}
                                       name='lastname'
                                       label='Lastname'
                                       value={agent.lastname}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.nationalCode}
                                       onChange={onchange}
                                       name='nationalCode'
                                       label='National Code'
                                       value={agent.nationalCode}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.postalCode}
                                       onChange={onchange}
                                       name='postalCode'
                                       label='Postal Code'
                                       value={agent.postalCode}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.uniqueId}
                                       onChange={onchange}
                                       name='uniqueId'
                                       label='Unique Id'
                                       value={agent.uniqueId}/>
                        </Grid>


                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>

                        <Grid item xs={12}>
                            <TextField error={errors.mobile}
                                       onChange={onchange}
                                       name='mobile'
                                       label='Mobile'
                                       value={agent.mobile}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.phone}
                                       onChange={onchange}
                                       name='phone'
                                       label='Phone'
                                       value={agent.phone}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.birthDate}
                                       onChange={onchange}
                                       name='birthDate'
                                       label='Birth Date'
                                       value={agent.birthDate}/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.gradeId}
                                          value={Service.getGrade(agent)}
                                          data={GradeService.Grades}
                                          onChange={onchange}
                                          name='gradeId'
                                          label='Grade'/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.countryDivisionId}
                                          value={Service.getCountryDivision(agent)}
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

export default TagRequestForm;