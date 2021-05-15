import React from 'react';
import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        height: '50px',
        marginBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    }
}));
const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton color={"inherit"}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        وزارت جهاد و کشاورزی
                    </Typography>
                    <IconButton color='inherit'>
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;