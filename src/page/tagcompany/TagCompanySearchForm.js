import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import * as Service from '../../service/tagcompany/TagCompanyService';
import Checkbox from "../../component/controls/Checkbox";


const TagCompanySearchForm = (props) => {

    const [searchCriteria, setSearchCriteria] = useState(Service.TagCompany_SEARCH_CRITERIA)
    const {setOpen, searchAction} = props;

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
                        <TextField label='UniqueId'
                                   name='uniqueId'
                                   value={searchCriteria.uniqueId}
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
                        <TextField label='Established Year'
                                   name='establishedYear'
                                   value={searchCriteria.establishedYear}
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
                        <TextField label='Manager Name'
                                   name='managerName'
                                   value={searchCriteria.managerName}
                                   onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Company Name'
                                   name='companyName'
                                   value={searchCriteria.companyName}
                                   onChange={onChange}
                        />
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

export default TagCompanySearchForm;