import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link} from "react-router-dom";
import * as BasicService from '../service/BaseService';
import {CARTABLE_LINKS, TAG_STORE_LINKS} from "../service/BaseService";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    link: {
        color: 'white',
        // backgroundColor: theme.palette.primary.light,
        textDecoration: 'none'
    }
}));

export default function SideMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const {open, setOpen} = props;


    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="basic-information-header"
                    >
                        <Typography className={classes.heading}>Basic Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.BASIC_INFORMATION_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="identity-header"
                    >
                        <Typography className={classes.heading}>Identity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.IDENTITY_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="tag-header"
                    >
                        <Typography className={classes.heading}>Tag</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.TAG_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="cartable-header"
                    >
                        <Typography className={classes.heading}>Cartable</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.CARTABLE_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="tagStore-header"
                    >
                        <Typography className={classes.heading}>Tag Store</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.TAG_STORE_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Data Transform</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.TAG_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon><MailIcon/></ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Reports</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.TAG_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon><MailIcon/></ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>User Management</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {BasicService.TAG_LINKS.map((link, index) => (
                                <ListItem button key={link.to}>
                                    <ListItemIcon><MailIcon/></ListItemIcon>
                                    <Link onClick={() => setOpen(false)}
                                          className={classes.link}
                                          to={link.to}>{link.title}</Link>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Drawer>
        </div>
    );
}
