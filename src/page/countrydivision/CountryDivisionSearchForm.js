import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import * as Service from '../../service/countrydivision/CountryDivisionService';


const CountryDivisionSearchForm = (props) => {

    const [searchCriteria, setSearchCriteria] = useState(Service.SEARCH_CRITERIA)
    const {setOpen, setOpenCDTree, searchAction} = props;

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

                    <Grid item xs={12}>
                        <TextField label='Type'
                                   name='type'
                                   value={searchCriteria.type}
                                   onChange={onChange}
                        />
                    </Grid>

                </Grid>
                <Grid item container xs={12} md={6} spacing={3}>

                    <Grid item xs={12}>
                        <TextField label='Parent'
                                   name='parent'
                                   value={searchCriteria.parent}
                                   onChange={onChange}
                        />
                    </Grid>


                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                label='??????????'
                                color='secondary'
                                onClick={() => searchAction(searchCriteria)}
                                icon={<SearchIcon/>}/>

                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => setOpen(true)}
                                label='????????'
                                color='primary'
                                icon={<SaveIcon/>}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => setOpenCDTree(true)}
                                label='?????????? ???????????? ??????????'
                                color='secondary'
                                icon={<AccountTreeIcon/>}/>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>


        </>
    );
}

export default CountryDivisionSearchForm;