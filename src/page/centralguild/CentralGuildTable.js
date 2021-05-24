import React from 'react';
import {
    Checkbox,
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({

    head: {
        backgroundColor: theme.palette.primary.dark
    },
    evenRow: {
        backgroundColor: theme.palette.secondary.main
    },
    oddRow: {
        backgroundColor: theme.palette.secondary.light
    },
}));
const CentralGuildTable = (props) => {
    const classes = useStyles();
    const {pageData, onEditClick, onDeleteClick} = props;

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell align='center'>Id</TableCell>
                        <TableCell align='center'>uniqueId</TableCell>
                        <TableCell align='center'>code</TableCell>
                        <TableCell align='center'>managerName</TableCell>
                        <TableCell align='center'>name</TableCell>
                        <TableCell align='center'>postalCode</TableCell>
                        <TableCell align='center'>active</TableCell>
                        <TableCell align='center'>phone</TableCell>
                        <TableCell align='center'>mobile</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageData.data.map((guild, index) => (
                        <TableRow className={index % 2 === 0 ? classes.evenRow : ''} key={guild.code}>
                            <TableCell align='center'>{index+1}</TableCell>
                            <TableCell align='center'>{guild.uniqueId}</TableCell>
                            <TableCell align='center'>{guild.code}</TableCell>
                            <TableCell align='center'>{guild.managerName}</TableCell>
                            <TableCell align='center'>{guild.name}</TableCell>
                            <TableCell align='center'>{guild.postalCode}</TableCell>
                            <TableCell align='center'><Checkbox color='primary' checked={guild.active} disableRipple/>
                            </TableCell>
                            <TableCell align='center'>{guild.phone}</TableCell>
                            <TableCell align='center'>{guild.mobile}</TableCell>
                            <TableCell align='center'>
                                <IconButton size='small' onClick={() => onDeleteClick(guild)}>
                                    <DeleteIcon fontSize='small' color="primary"/>
                                </IconButton>
                                <IconButton size='small' onClick={() => onEditClick(guild)}>
                                    <EditIcon fontSize='small' color="primary"/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CentralGuildTable;