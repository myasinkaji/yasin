import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import * as Service from '../../service/subunit/SubunitService';
import Checkbox from "../../component/controls/Checkbox";


const SubunitSearchForm = (props) => {

    const [searchCriteria, setSearchCriteria] = useState(Service.SUBUNIT_SEARCH_CRITERIA)
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
                        <TextField onChange={onchange}
                                   name='uniqueId'
                                   label='Unique Id'
                                   value={searchCriteria.uniqueId}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField onChange={onchange}
                                   name='capacity'
                                   label='Capacity'
                                   value={searchCriteria.capacity}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField onChange={onchange}
                                   name='licenseNumber'
                                   label='License Number'
                                   value={searchCriteria.licenseNumber}/>
                    </Grid>

                </Grid>
                <Grid item container xs={12} md={6} spacing={3}>

                    <Grid item xs={12}>
                        <TextField onChange={onchange}
                                   name='licenseIssueDate'
                                   label='License Issue Date'
                                   value={searchCriteria.licenseIssueDate}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField onChange={onchange}
                                   name='licenseExpireDate'
                                   label='License Expire Date'
                                   value={searchCriteria.licenseExpireDate}/>
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

export default SubunitSearchForm;