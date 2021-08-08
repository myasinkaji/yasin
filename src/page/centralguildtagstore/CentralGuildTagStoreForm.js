import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/centralguildcartable/CentralGuildCartableService';
import * as AnimalKindEnum from '../../service/enums/AnimalKind';
import * as TagTypeEnum from '../../service/enums/TagType';
import * as TagCompanyService from '../../service/tagcompany/TagCompanyService';
import * as CentralGuildService from '../../service/centralGuild/CentralGuildService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import AutoComplete from "../../component/controls/AutoComplete";


const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const CentralGuildTagStoreForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_TAG_REQUEST;
    const [tagRequest, setTagRequest] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [centralGuilds, setCentralGuilds] = useState([]);
    const [tagCompanies, setTagCompanies] = useState([]);

    useEffect(() => {
        CentralGuildService.getLazy()
            .then(response => setCentralGuilds(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));

        TagCompanyService.getLazy()
            .then(response => setTagCompanies(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));

    }, []);

    function onchange(event) {
        const {name, value} = event.target;
        setTagRequest({
            ...tagRequest,
            [name]: value,
        });
    }

    function register() {
        if (Service.validate(tagRequest, setErrors)) {
            Service.save(tagRequest).then(() => {
                submitAware(tagRequest);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
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
                            <AutoComplete error={errors.centralGuildCode}
                                          value={Service.getCentralGuildOf(tagRequest)}
                                          data={centralGuilds}
                                          onChange={onchange}
                                          name='centralGuildCode'
                                          label='Central Guild'/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.animalKind}
                                          value={AnimalKindEnum.AnimalKind[tagRequest.animalKind]}
                                          data={AnimalKindEnum.AnimalKind}
                                          onChange={onchange}
                                          name='animalKind'
                                          label='Animal Kind'/>
                        </Grid>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.tagType}
                                          value={TagTypeEnum.TagType[tagRequest.tagType]}
                                          data={TagTypeEnum.TagType}
                                          onChange={onchange}
                                          name='tagType'
                                          label='Tag Type'/>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <AutoComplete error={errors.tagCompanyId}
                                          value={Service.getTagCompanyOf(tagRequest)}
                                          data={tagCompanies}
                                          onChange={onchange}
                                          name='tagCompanyId'
                                          label='Tag Company'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.count}
                                       onChange={onchange}
                                       name='count'
                                       label='Count'
                                       value={tagRequest.count}/>
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

export default CentralGuildTagStoreForm;