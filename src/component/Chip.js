import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function CustomChip(props) {
    const {chips, handleDelete} = props;
    const classes = useStyles();


    return (
        <div className={classes.root}>
            {chips.map((chip) => (
                <Chip
                    key={chip.label}
                    variant={props.variant ? props.variant : 'outlined'}
                    size={props.size ? props.size : 'small'}
                    icon={<FaceIcon />}
                    label={chip.label}
                    onDelete={() => handleDelete(chip)}
                    color={props.color ? props.color : 'secondary'}
                />
            ))}
        </div>
    );
}
