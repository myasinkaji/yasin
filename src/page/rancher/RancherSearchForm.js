import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import * as Service from '../../service/rancher/RancherService';
import AutoComplete from "../../component/controls/AutoComplete";
import * as CountryDivisionService from "../../service/countrydivision/CountryDivisionService";
import * as BaseService from "../../service/BaseService";


const RancherSearchForm = (props) => {

    const [searchCriteria, setSearchCriteria] = useState(Service.SEARCH_CRITERIA)
    const {setOpen, searchAction, setNotify} = props;
    const [countryDivisions, setCountryDivisions] = useState([]);

    useEffect(() => {
        CountryDivisionService.getLazy()
            .then(response => setCountryDivisions(response.data.data))
            .catch(e => setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`)));

    }, []);

    const onChange = event => {
        const {name, value} = event.target;
        setSearchCriteria({
            ...searchCriteria,
            [name]: value
        })
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item container xs={12} md={6} spacing={3}>
                    <Grid item xs={12}>
                        <TextField onChange={onChange}
                                   name='nationalCode'
                                   label='National Code'
                                   value={searchCriteria.nationalCode}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={onChange}
                                   name='companyName'
                                   label='Company Name'
                                   value={searchCriteria.companyName}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={onChange}
                                   name='companyNationalId'
                                   label='Company National Code'
                                   value={searchCriteria.companyNationalId}/>
                    </Grid>
                </Grid>
                <Grid item container xs={12} md={6} spacing={3}>

                    <Grid item xs={12}>
                        <TextField onChange={onChange}
                                   name='mobile'
                                   label='Mobile'
                                   value={searchCriteria.mobile}/>
                    </Grid>
                    <Grid item xs={12}>
                        <AutoComplete data={countryDivisions}
                                      onChange={onChange}
                                      name='countryDivisionId'
                                      label='Country Division'/>
                    </Grid>


                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                label='جستجو'
                                color='secondary'
                                onClick={() => searchAction(searchCriteria)}
                                icon={<SearchIcon/>}/>

                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => {
                                    setOpen(true)
                                }}
                                label='جدید'
                                color='primary'
                                icon={<SaveIcon/>}/>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>


        </>
    );
}

export default RancherSearchForm;