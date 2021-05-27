import React from 'react';
import {Autocomplete} from "@material-ui/lab";
import TextField from "./TextField";

const AutoComplete = (props) => {

    const {data, error, onChange, name, label} = props;

    function onChangeAction(e, newValue) {
        onChange({
            target: {
                name,
                value: newValue ? newValue.id : ""
            }
        })
    }

    const renderInput = (params) => {
        return <TextField error={error}
                          {...params} label={label}/>;
    }

    return (
        <Autocomplete
            onChange={onChangeAction}
            options={data}
            getOptionLabel={option => option.title}
            renderInput={renderInput}
        />
    );
}

export default AutoComplete;