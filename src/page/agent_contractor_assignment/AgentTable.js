import React, {useEffect, useState} from 'react';
import {
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
import * as Service from '../../service/agent/AgentService';
import Checkbox from "@material-ui/core/Checkbox";

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
    {id: 'postalCode', title: 'Postal Code', sortable: true},
    {id: 'firstname', title: 'Firstname', sortable: false},
    {id: 'lastname', title: 'Lastname', sortable: false},
    {id: 'gradeId', title: 'Grade', sortable: false},
    {id: 'countryDivisionId', title: 'Country Division', sortable: false},
];

const AgentTable = (props) => {
    const classes = useStyles();
    const {pageData, loadPage, selectedList, handleOnChange} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(Constants.DEFAULT_ROWS_PER_PAGE_OPTIONS[0]);
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
            <Table size="medium">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell align='center'>Select</TableCell>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageData.data.map((agent, index) => (
                        <TableRow className={index % 2 === 0 ? classes.evenRow : ''} key={agent.code}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color='primary'
                                    label='Active'
                                    name="active"
                                    checked={selectedList.forEach(selected => selected.uniqueId === agent.uniqueId)}
                                    onChange={(event, checked) => handleOnChange(checked, agent)}
                                />
                            </TableCell>

                            <TableCell className={classes.cell} align='center'>{agent.uniqueId}</TableCell>
                            <TableCell className={classes.cell} align='center'>{agent.nationalCode}</TableCell>
                            <TableCell className={classes.cell} align='center'>{agent.postalCode}</TableCell>
                            <TableCell className={classes.cell} align='center'>{agent.firstname}</TableCell>
                            <TableCell className={classes.cell} align='center'>{agent.lastname}</TableCell>
                            <TableCell className={classes.cell} align='center'>{agent.gradeTitle}</TableCell>
                            <TableCell className={classes.cell} align='center'>{agent.countryDivisionName}</TableCell>
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

export default AgentTable;