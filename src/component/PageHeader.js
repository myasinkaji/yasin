import React from 'react';
import {makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        '&, & $icon': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    icon: {
        padding: theme.spacing(1.5),
        marginRight: theme.spacing(4),
    },
    subtitle: {
        opacity: 0.6
    },
}));
const PageHeader = (props) => {
    const classes = useStyles();
    const {title, subtitle, icon} = props;

    return (
        <Paper square className={classes.root}>
            <Toolbar>
                <Paper square className={classes.icon}>
                    {icon}
                </Paper>
                <div>
                    <Typography variant='h6'>{title}</Typography>
                    <Typography variant='subtitle2' className={classes.subtitle}>{subtitle}</Typography>
                </div>
            </Toolbar>
        </Paper>

    );
}

export default PageHeader;