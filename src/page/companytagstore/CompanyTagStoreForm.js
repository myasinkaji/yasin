import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/centralGuildTagStore/CentralGuildTagStoreService';
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


const CompanyTagStoreForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate;
    const [tagRequest, setTagRequest] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [provinceGuilds, setProvinceGuilds] = useState([]);

    useEffect(() => {
        ProvinceGuildService.getLazyProvinceGuildChildren(initialValue)
            .then(response => setProvinceGuilds(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));
    }, []);

    function onchange(event) {
        const {name, value} = event.target;
        setTagRequest({
            ...tagRequest,
            [name]: value,
        });
    }

    function distribute() {
        if (Service.validate(tagRequest, setErrors)) {
            if (Service.checkValidation(tagRequest, setErrors)) {
                Service.save(tagRequest).then(() => {
                    submitAware(tagRequest);
                }).catch(e => {
                    setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
                })
            }
        }
    }

    function reset() {
        setTagRequest(initialValue);
    }

    return (
        <>
            <DialogContent className={classes.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.provinceGuildCode}
                                // value={Service.getCentralGuildOf(tagRequest)}
                                          data={provinceGuilds}
                                          onChange={onchange}
                                          name='provinceGuildCode'
                                          label='Province Guild'/>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <TextField error={errors.distributeCount}
                                       onChange={onchange}
                                       name='distributeCount'
                                       label='Count'
                                // value={tagRequest.count}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Grid container>
                    {/*                    <Grid item xs={12} sm={6}>
                        <Button label='Reset' color='secondary' onClick={reset} type='reset'/>
                    </Grid>*/}
                    <Grid item xs={0} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button label='توزیع' color='secondary' onClick={distribute} type='submit'/>
                    </Grid>
                    <Grid item xs={0} sm={3}>
                    </Grid>
                </Grid>
            </DialogActions>
        </>
    );
}

export default CompanyTagStoreForm;