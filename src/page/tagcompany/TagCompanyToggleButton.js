import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {ToggleButton as MuiToggleButton} from '@material-ui/lab';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.secondary.light,
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
    },
    divider: {
        border: `1px solid`,
        margin: theme.spacing(1, 0.5),
    },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

export default function TagCompanyToggleButton() {
    const [tags, setTags] = React.useState([]);
    const [producerImporter, setProducerImporter] = React.useState(() => []);

    const handleProducerImporter = (event, array) => {
        setProducerImporter(array);
    };

    const handleTags = (event, tags) => {
        setTags(tags);
    };

    const classes = useStyles();

    return (
        <div>
            <Paper elevation={0} className={classes.paper}>
                <StyledToggleButtonGroup
                    size="small"
                    value={tags}
                    // exclusive
                    onChange={handleTags}
                    aria-label="text alignment">
                    <MuiToggleButton value="visualTag">
                        <Typography color='inherit' variant='caption'>
                            visualTag
                        </Typography>
                    </MuiToggleButton>
                    <MuiToggleButton value="rfidTag">
                        <Typography color='inherit' variant='caption'>
                            rfidTag
                        </Typography>
                    </MuiToggleButton>
                    <MuiToggleButton value="microchipTag">
                        <Typography color='inherit' variant='caption'>
                            microchipTag
                        </Typography>
                    </MuiToggleButton>
                    <MuiToggleButton value="bolusesTag">
                        <Typography color='inherit' variant='caption'>
                            bolusesTag
                        </Typography>
                    </MuiToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider}/>
                <StyledToggleButtonGroup
                    size="small"
                    value={producerImporter}
                    onChange={handleProducerImporter}>
                    <MuiToggleButton value="importer">
                        <Typography color='inherit' variant='caption'>
                            Importer
                        </Typography>
                    </MuiToggleButton>
                    <MuiToggleButton value="producer">
                        <Typography color='inherit' variant='caption'>
                            Producer
                        </Typography>
                    </MuiToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
        </div>
    );
}
