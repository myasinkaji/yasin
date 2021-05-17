import React, {useState} from 'react';
import {Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";
import Button from "../../component/controls/Button";
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';


const CentralGuildSearchForm = (props) => {

    const [active, setActive] = useState(true);
    const {setOpen} = props;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item container xs={12} md={6} spacing={3}>
                    <Grid item xs={12}>
                        <TextField label='Code'/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Name'/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='UniqueId'/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox
                                color='primary'
                                checked={active}
                                onChange={() => setActive(!active)}
                                name="checkedA"/>}
                            label="Active"
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} md={6} spacing={3}>

                    <Grid item xs={12}>
                        <TextField label='Phone'/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Mobile'/>
                    </Grid>


                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <Button
                                label='جستجو'
                                color='secondary'
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

export default CentralGuildSearchForm;