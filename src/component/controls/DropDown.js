import React from 'react';
import {FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%'
    }
}));

const DropDown = () => {
    const classes = useStyles();
    return (
        <FormControl className={classes.root}>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={age}
                // onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
    );
}

export default DropDown;