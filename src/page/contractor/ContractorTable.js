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
    TableHead, TablePagination,
    TableRow, TableSortLabel
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as Constants from '../../service/Constants';
import * as Service from '../../service/contractor/ContractorService';

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
    {id: 'code', title: 'Code', sortable: true},
    {id: 'managerName', title: 'Manager Name', sortable: true},
    {id: 'name', title: 'Name', sortable: true},
    {id: 'postalCode', title: 'Postal Code', sortable: false},
    {id: 'centralGuild', title: 'Central Guild', sortable: true},
    {id: 'countryDivision', title: 'Country Division', sortable: true},
    {id: 'active', title: 'Active', sortable: true},
    {id: 'phone', title: 'Phone', sortable: false},
    {id: 'mobile', title: 'Mobile', sortable: false},
];

const ContractorTable = (props) => {
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
                    {pageData.data.map((guild, index) => (
                        <TableRow className={index % 2 === 0 ? classes.evenRow : ''} key={guild.code}>
                            <TableCell className={classes.cell} align='center'>{(page * rowsPerPage) + index+1}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.uniqueId}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.code}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.managerName}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.name}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.postalCode}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.centralGuildName}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.countryDivisionName}</TableCell>
                            <TableCell className={classes.cell} align='center'>
                                <Checkbox className={classes.checkbox} color='primary'
                                          size='small' checked={guild.active} disableRipple/>
                            </TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.phone}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.mobile}</TableCell>
                            <TableCell className={classes.cell} align='center'>
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

export default ContractorTable;