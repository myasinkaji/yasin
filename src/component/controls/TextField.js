import React from 'react';
import {TextField as MuiTextField} from "@material-ui/core";

const TextField = (props) => {

    return (
        <MuiTextField
            size='small'
            {...props}
            style={{width: '90%'}}/>
    );
}

export default TextField;