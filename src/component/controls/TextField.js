import React from 'react';
import {TextField as MuiTextField} from "@material-ui/core";

const TextField = (props) => {
    const {error} = props;

    return (
        <MuiTextField
            size='small'
            {...props}
            {...(error ? {error: true, helperText: error} : {})}
            style={{width: '90%'}}/>
    );
}

export default TextField;