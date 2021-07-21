import React, {useEffect, useState} from 'react';
import {
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
import * as Service from '../../service/rancher/RancherService';

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
    {id: 'uniqueId', title: 'uniqueId', sortable: true},
    {id: 'nationalCode', title: 'National Code', sortable: true},
    {id: 'firstname', title: 'Firstname', sortable: false},
    {id: 'lastname', title: 'Lastname', sortable: false},
    {id: 'companyName', title: 'Company Name', sortable: false},
    {id: 'countryDivisionId', title: 'Country Division', sortable: false},
    {id: 'provinceGuildCode', title: 'Province Guild', sortable: false},
];

const RancherTable = (props) => {
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
                            <TableCell className={classes.cell}
                                       align='center'>{(page * rowsPerPage) + index + 1}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.uniqueId}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.nationalCode}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.firstname}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.lastname}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.companyName}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.countryDivisionName}</TableCell>
                            <TableCell className={classes.cell} align='center'>{guild.provinceGuildName}</TableCell>
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

export default RancherTable;