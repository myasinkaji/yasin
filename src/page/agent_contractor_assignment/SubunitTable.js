import React, {useEffect, useState} from 'react';
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
    TablePagination,
    TableRow,
    TableSortLabel
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as Constants from '../../service/Constants';
import * as Service from '../../service/subunit/SubunitService';

const useStyles = makeStyles(theme => ({
    checkbox: {
        padding: theme.spacing(0),
    },
    cell: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        padding: theme.spacing(0),
    },
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

const HEADERS = [
    {id: 'uniqueId', title: 'Unique Id', sortable: true},
    {id: 'capacity', title: 'capacity', sortable: true},
    {id: 'licenseNumber', title: 'License Number', sortable: false},
    {id: 'licenseIssueDate', title: 'License Issue Date', sortable: true},
    {id: 'licenseExpireDate', title: 'License Expire Date', sortable: true},
    {id: 'activity', title: 'Activity', sortable: false},
    {id: 'herd', title: 'Herd', sortable: false},
    {id: 'active', title: 'Active', sortable: true},
    {id: 'hasLicense', title: 'Has License', sortable: true},
];

const SubunitTable = (props) => {
    const classes = useStyles();
    const {pageData, onEditClick, onDeleteClick, loadPage} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(Constants.DEFAULT_ROWS_PER_PAGE);
    const [orderBy, setOrderBy] = useState(Service.DEFAULT_PAGE_REQUEST.orderBy);
    const [order, setOrder] = useState(Constants.DEFAULT_ORDER);

    useEffect(() => {
        loadPage({
            page,
            pageSize: rowsPerPage,
            order,
            orderBy
        })
    }, [page, rowsPerPage, orderBy, order]);

    function changePage(event, newPage) {
        setPage(newPage);
    }

    function changeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    function orderChanged(newOrderBy) {
        setOrder(orderBy === newOrderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc')
        setOrderBy(newOrderBy);
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell align='center'>Id</TableCell>
                        {
                            HEADERS.map(header => (<TableCell align='center' key={header.id}>
                                {header.sortable ?
                                    <TableSortLabel
                                        active={orderBy === header.id}
                                        direction={orderBy === header.id ? order : 'asc'}
                                        onClick={() => orderChanged(header.id)}>
                                        {header.title}
                                    </TableSortLabel>
                                    : header.title
                                }
                            </TableCell>))
                        }
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageData.data.map((subunit, index) => (
                        <TableRow className={index % 2 === 0 ? classes.evenRow : ''} key={subunit.code}>
                            <TableCell className={classes.cell}
                                       align='center'>{(page * rowsPerPage) + index + 1}</TableCell>
                            <TableCell className={classes.cell} align='center'>{subunit.uniqueId}</TableCell>
                            <TableCell className={classes.cell} align='center'>{subunit.capacity}</TableCell>
                            <TableCell className={classes.cell} align='center'>{subunit.licenseNumber}</TableCell>
                            <TableCell className={classes.cell} align='center'>{subunit.licenseIssueDate}</TableCell>
                            <TableCell className={classes.cell} align='center'>{subunit.licenseExpireDate}</TableCell>
                            <TableCell className={classes.cell} align='center'>{subunit.activityName}</TableCell>
                            <TableCell className={classes.cell} align='center'>{subunit.herdName}</TableCell>
                            <TableCell className={classes.cell} align='center'>
                                <Checkbox className={classes.checkbox} color='primary'
                                          size='small' checked={subunit.active} disableRipple/>
                            </TableCell>
                            <TableCell className={classes.cell} align='center'>
                                <Checkbox className={classes.checkbox} color='primary'
                                          size='small' checked={subunit.hasLicense} disableRipple/>
                            </TableCell>
                            <TableCell className={classes.cell} align='center'>
                                <IconButton size='small' onClick={() => onDeleteClick(subunit)}>
                                    <DeleteIcon fontSize='small' color="primary"/>
                                </IconButton>
                                <IconButton size='small' onClick={() => onEditClick(subunit)}>
                                    <EditIcon fontSize='small' color="primary"/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                rowsPerPageOptions={Constants.DEFAULT_ROWS_PER_PAGE_OPTIONS}
                rowsPerPage={rowsPerPage}
                page={page}
                count={pageData.count}
                onChangePage={changePage}
                onChangeRowsPerPage={changeRowsPerPage}
            />
        </TableContainer>
    );
}

export default SubunitTable;