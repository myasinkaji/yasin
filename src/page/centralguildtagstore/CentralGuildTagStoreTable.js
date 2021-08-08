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
import * as Constants from '../../service/Constants';
import * as Service from '../../service/centralguildcartable/CentralGuildCartableService';
import {AnimalKind} from "../../service/enums/AnimalKind";
import {TagType} from "../../service/enums/TagType";
import LabelIcon from '@material-ui/icons/Label';

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
    {id: 'animalKind', title: 'Animal Kind', sortable: true},
    {id: 'tagType', title: 'Tag Type', sortable: true},
    {id: 'count', title: 'Count', sortable: true},
    {id: 'remained', title: 'Remained', sortable: true},
    {id: 'from', title: 'From', sortable: true},
    {id: 'to', title: 'To', sortable: true},
    {id: 'createdTime', title: 'Created Time', sortable: false},
    {id: 'tagCompanyId', title: 'Tag Company', sortable: false},
    {id: 'centralGuildCode', title: 'Central Guild', sortable: false},
];

const CentralGuildTagStoreTable = (props) => {
    const classes = useStyles();
    const {pageData, distribute, loadPage} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(Constants.DEFAULT_ROWS_PER_PAGE);
    const [orderBy, setOrderBy] = useState(Service.DEFAULT_PAGE_REQUEST.orderBy);
    const [order, setOrder] = useState(Service.DEFAULT_PAGE_REQUEST.order);

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
                        <TableCell align='center'>Distribute</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageData.data.map((tagRequest, index) => (
                        <TableRow className={index % 2 === 0 ? classes.evenRow : ''} key={index}>
                            <TableCell className={classes.cell}
                                       align='center'>{(page * rowsPerPage) + index + 1}</TableCell>
                            <TableCell className={classes.cell}
                                       align='center'>{AnimalKind[tagRequest.animalKind].title}</TableCell>
                            <TableCell className={classes.cell}
                                       align='center'>{TagType[tagRequest.tagType].title}</TableCell>
                            <TableCell className={classes.cell} align='center'>{tagRequest.count}</TableCell>
                            <TableCell className={classes.cell} align='center'>{tagRequest.remained}</TableCell>
                            <TableCell className={classes.cell}
                                       align='center'>{tagRequest.from === 0 ? '' : tagRequest.from}</TableCell>
                            <TableCell className={classes.cell}
                                       align='center'>{tagRequest.to === 0 ? '' : tagRequest.to}</TableCell>
                            <TableCell className={classes.cell} align='center'>{tagRequest.createdTime}</TableCell>
                            <TableCell className={classes.cell} align='center'>{tagRequest.tagCompanyName}</TableCell>
                            <TableCell className={classes.cell} align='center'>{tagRequest.centralGuildName}</TableCell>
                            <TableCell className={classes.cell} align='center'>
                                <IconButton size='small' onClick={() => distribute(tagRequest)}>
                                    <LabelIcon fontSize='small' color="primary"/>
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

export default CentralGuildTagStoreTable;