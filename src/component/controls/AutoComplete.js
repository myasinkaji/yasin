import React, {useState} from 'react';
import {Autocomplete} from "@material-ui/lab";
import TextField from "./TextField";

const AutoComplete = (props) => {

    const {value, data, error, onChange, name, label} = props;
    const [selectedValue, setSelectedValue] = useState(value);

    function onChangeAction(e, newValue) {
        onChange({
            target: {
                name,
                value: newValue ? newValue.id : ""
            }
        })
        setSelectedValue(newValue);
    }

    const renderInput = (params) => {
        return <TextField error={error}
                          {...params} label={label}/>;
    }

    return (
        <Autocomplete
            value={selectedValue}
            onChange={onChangeAction}
            options={data}
            getOptionLabel={option => option.title}
            renderInput={renderInput}
        />
    );
}

export default AutoComplete;