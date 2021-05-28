import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent, Grid, makeStyles} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import * as Service from '../../service/tagcompany/TagCompanyService';
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import Checkbox from "../../component/controls/Checkbox";
import TagCompanyToggleButton from "./TagCompanyToggleButton";

const useStyle = makeStyles(theme => ({
    dialogContent: {
        backgroundColor: 'pink',
        paddingBottom: theme.spacing(4)
    }
}));


const TagCompanyForm = (props) => {
    const classes = useStyle();
    const {recordForUpdate, submitAware, setNotify} = props;
    const initialValue = recordForUpdate ? recordForUpdate : Service.INITIAL_TagCompany;
    const [tagCompany, setTagCompany] = useState(initialValue);
    const [errors, setErrors] = useState(Constants.NO_ERROR);
    const [tags, setTags] = React.useState([]);
    const [producerImporter, setProducerImporter] = React.useState([]);

    useEffect(() => {
        setToggleButtons(initialValue);
    }, []);

    useEffect(() => {
        Service.TagCompany_TOGGLES.forEach(property => onchange(convertToOnChangeEvent(property, false)));
        producerImporter.forEach(pi => onchange(convertToOnChangeEvent(pi, true)));
        tags.forEach(tag => onchange(convertToOnChangeEvent(tag, true)));
    }, [tags, producerImporter]);

    function setToggleButtons(tagCompany) {
        const arr = [];
        Service.TagCompany_TOGGLES.forEach(property => {
            if (tagCompany[property]) arr.push(property);
        });
        setProducerImporter(arr);
        setTags(arr);
    }

    function onchange(event) {
        const {name, value} = event.target;
        setTagCompany({
            ...tagCompany,
            [name]: value,
        });
    }


    const convertToOnChangeEvent = (name, value) => ({
        target: {
            name, value
        }
    });

    function register() {
        if (Service.validate(tagCompany, setErrors)) {
            Service.save(tagCompany).then(() => {
                submitAware(tagCompany);
            }).catch(e => {
                setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
            })
        }
    }

    function reset() {
        setTagCompany(initialValue);
        setToggleButtons(initialValue)
    }

    return (
        <>
            <DialogContent className={classes.dialogContent}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} md={6} spacing={3}>
                        <Grid item xs={12}>
                            <TextField error={errors.uniqueId}
                                       onChange={onchange} name='uniqueId' label='UniqueId'
                                       value={tagCompany.uniqueId}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.companyName}
                                       onChange={onchange}
                                       name='companyName'
                                       label='Company Name'
                                       value={tagCompany.companyName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.postalCode}
                                       onChange={onchange} name='postalCode'
                                       label='Postal Code'
                                       value={tagCompany.postalCode}/>
                        </Grid>

                    </Grid>
                    <Grid item container xs={12} md={6} spacing={3}>

                        <Grid item xs={12}>
                            <TextField error={errors.establishedYear}
                                       onChange={onchange} name='establishedYear'
                                       label='Established Year'
                                       value={tagCompany.establishedYear}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errors.managerName}
                                       onChange={onchange}
                                       name='managerName'
                                       label='Manager Name'
                                       value={tagCompany.managerName}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                name='active'
                                label="Is Active"
                                checked={tagCompany.active}
                                onChange={onchange}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <TagCompanyToggleButton tags={tags}
                                                    setTags={setTags}
                                                    producerImporter={producerImporter}
                                                    setProducerImporter={setProducerImporter}/>
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

export default TagCompanyForm;