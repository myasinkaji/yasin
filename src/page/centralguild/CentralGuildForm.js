import React from 'react';
import {Grid} from "@material-ui/core";
import TextField from "../../component/controls/TextField";

const CentralGuildForm = () => {
    return (
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
                    <TextField label='Postal Code'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Manager Name'/>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={6} spacing={3}>

                <Grid item xs={12}>
                    <TextField label='Phone'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Mobile'/>
                </Grid>

            </Grid>


        </Grid>
    );
}

export default CentralGuildForm;