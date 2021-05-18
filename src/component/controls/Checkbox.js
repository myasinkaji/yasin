import React from 'react';
import {Checkbox as MuiCheckbox, FormControlLabel} from "@material-ui/core";

const Checkbox = (props) => {
    const {checked, onChange, name, label} = props;

    const convert = (name, value) => ({
        target: {
            name, value
        }
    });

    return (
        <FormControlLabel
            control={<MuiCheckbox
                color='primary'
                checked={checked}
                name={name}
                {...(onChange ?
                    {onChange: e => onChange(convert(name, e.target.checked))}
                    : {})}
            />}
            label={label}
        />
    );
}

export default Checkbox;