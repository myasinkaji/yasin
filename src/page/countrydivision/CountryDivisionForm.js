import React, {useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/countrydivision/CountryDivisionService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const CountryDivisionForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_COUNTRY_DIVISION;
    const [countryDivision, setCountryDivision] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);

    function onchange(event) {
        const {name, value} = event.target;
        setCountryDivision({
            ...countryDivision,
            [name]: value,
        });
    }

    function register() {
        if (Service.validate(countryDivision, setErrors)) {
            Service.save(countryDivision).then(() => {
                submitAware(countryDivision);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setCountryDivision(initialValue);
    }

    return (
        <>
            <DialogContent className={classes.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <TextField error={errors.code}
                                       onChange={onchange} name='code' label='Code' value={countryDivision.code}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.name}
                                       onChange={onchange} name='name' label='Name' value={countryDivision.name}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.type}
                                       onChange={onchange} name='type' label='Type' value={countryDivision.type}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.parent}
                                       onChange={onchange} name='parent' label='Parent' value={countryDivision.parent}/>
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

export default CountryDivisionForm;