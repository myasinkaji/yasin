import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import * as Service from '../../service/herd/HerdService';
import Checkbox from "../../component/controls/Checkbox";
import AutoComplete from "../../component/controls/AutoComplete";
import * as CountryDivisionService from "../../service/countrydivision/CountryDivisionService";
import * as BaseService from "../../service/BaseService";
import * as ContractorService from "../../service/contractor/ContractorService";


const HerdSearchForm = (props) => {

    const [searchCriteria, setSearchCriteria] = useState(Service.HERD_SEARCH_CRITERIA)
    const {setOpen, searchAction, setNotify} = props;
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
                        <TextField label='Code'
                                   name='code'
                                   value={searchCriteria.code}
                                   onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Epidemiologic Code'
                                   name='epidemiologicCode'
                                   value={searchCriteria.epidemiologicCode}
                                   onChange={onChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Postal Code'
                                   name='postalCode'
                                   value={searchCriteria.postalCode}
                                   onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Checkbox
                            color='secondary'
                            label='Active'
                            name="active"
                            checked={searchCriteria.active}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} md={6} spacing={3}>

                    <Grid item xs={12}>
                        <AutoComplete data={contractors}
                                      onChange={onChange}
                                      name='contractorNationalCode'
                                      label='Contractor'/>
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

export default HerdSearchForm;