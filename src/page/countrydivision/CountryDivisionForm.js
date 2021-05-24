import React, {useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/countrydivision/CountryDivisionService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import Checkbox from "../../component/controls/Checkbox";


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const CountryDivisionForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_GUILD;
    const [guild, setGuild] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);

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
                            <TextField error={errors.code}
                                       onChange={onchange} name='code' label='Code' value={guild.code}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.name}
                                       onChange={onchange} name='name' label='Name' value={guild.name}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField error={errors.uniqueId}
                                       onChange={onchange} name='uniqueId' label='UniqueId' value={guild.uniqueId}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.postalCode}
                                       onChange={onchange} name='postalCode' label='Postal Code'
                                       value={guild.postalCode}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.managerName}
                                       onChange={onchange} name='managerName' label='Manager Name'
                                       value={guild.managerName}/>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>

                        <Grid item xs={12}>
                            <TextField error={errors.phone}
                                       onChange={onchange} name='phone' label='Phone' value={guild.phone}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.mobile}
                                       onChange={onchange} name='mobile' label='Mobile' value={guild.mobile}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                name='active'
                                label="Is Active"
                                checked={guild.active}
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

export default CountryDivisionForm;