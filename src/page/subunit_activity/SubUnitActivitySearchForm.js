import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Checkbox from "../../component/controls/Checkbox";
import Button from "../../component/controls/Button";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import * as Service from "../../service/subunit_activity/SubUnitActivityService";

const SubUnitActivityForm = props => {
    const [searchCriteria, setSearchCriteria] = useState(Service.ACTIVITY_SEARCH_CRITERIA)
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
                        <TextField label='Code'
                                   name='code'
                                   value={searchCriteria.code}
                                   onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Name'
                                   name='name'
                                   value={searchCriteria.name}
                                   onChange={onChange}
                        />
                    </Grid>

                </Grid>
                <Grid item container xs={12} md={6} spacing={3}>

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

export default SubUnitActivityForm;