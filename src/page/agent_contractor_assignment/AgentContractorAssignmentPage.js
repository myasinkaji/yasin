import React, {useEffect, useState} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Paper} from "@material-ui/core";
import PageHeader from "../../component/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import * as BaseService from '../../service/BaseService';
import * as Constants from '../../service/Constants';
import Notification from "../../component/Notification";
import * as ContractorService from '../../service/contractor/ContractorService';
import * as AgentService from '../../service/agent/AgentService';
import CustomChip from "../../component/Chip";
import HorizontalLinearStepper from "../../component/stepper";
import ContractorTable from "./ContractorTable";
import AgentTable from "./AgentTable";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.warning.main
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));


const AgentContractorAssignmentPage = () => {
    const classes = useStyles();
    const [agentPage, setAgentPage] = useState(Constants.EMPTY_PAGE);
    const [contractorPage, setContractorPage] = useState(Constants.EMPTY_PAGE);
    const [notify, setNotify] = useState({isOpen: false, title: '', message: '', type: ''});
    const [loading, setLoading] = useState(false);
    const [selectedContractor, setSelectedContractor] = useState([]);
    const [selectedAgents, setSelectedAgents] = useState([]);

    useEffect(() => {
        ContractorService.getLazy();
    }, []);

    const loadContractorPage = (pageRequest) => {
        setLoading(true)
        const promise = ContractorService.getPage(pageRequest);
        setPageData(promise, setContractorPage);
    }

    const loadAgentPage = (pageRequest) => {
        setLoading(true)
        const promise = AgentService.getPage(pageRequest);
        setPageData(promise, setAgentPage);
    }

    function setPageData(promise, setter) {
        promise
            .then(response => {
                setter(response.data);
                setLoading(false);
            }).catch(error => {
            setNotify(BaseService.getErrorMessageObject(`Error Code: ${error.status}, Message: ${error.message}`))
        });
    }

    const handleSelectedContractorChange = (selected, contractor) => {
        if (selected)
            setSelectedContractor([{
                label: contractor.firstname,
                nationalCode: contractor.nationalCode,
                uniqueId: contractor.uniqueId
            }])
        else
            setSelectedContractor([])
    }

    const handleSelectedAgentsChange = (selected, agent) => {
        if (selected)
            addToSelectedList(agent)
        else
            removeFromSelectedList(agent)
    }

    function addToSelectedList(agent) {
        const newSelectedAgents = [...selectedAgents];
        newSelectedAgents.push({
            label: agent.firstname,
            nationalCode: agent.nationalCode,
            uniqueId: agent.uniqueId
        });
        setSelectedAgents(newSelectedAgents);
    }

    function removeFromSelectedList(agent) {
        const newSelectedAgents = selectedAgents.filter(selected => selected.uniqueId !== agent.uniqueId);
        setSelectedAgents(newSelectedAgents);
    }

    function nextButtonIsActive(step) {
        return !(step === 0 && selectedContractor.length !== 0)
            &&
            !(step === 1 && selectedAgents.length !== 0);

    }

    function handleFinish() {
        ContractorService.assignAgents(selectedContractor[0], selectedAgents)
            .then(() => {
                setSelectedContractor([]);
                setSelectedAgents([]);
                setNotify(BaseService.getSuccessMessageObject(`Assigned Successfully`))
            }).catch(e => {
            setNotify(BaseService.getErrorMessageObject(`Error Code: ${e.status}, Message: ${e.name}`));
        })
    }

    const steps = [
        {
            label: 'Select Contractor',
            content:
                <>
                    <CustomChip chips={selectedContractor}/>
                    <ContractorTable pageData={contractorPage}
                                     loadPage={loadContractorPage}
                                     selectedContractor={selectedContractor}
                                     handleOnChange={handleSelectedContractorChange}/>
                </>
        },
        {
            label: 'Select Agents',
            content:
                <>
                    <CustomChip chips={selectedAgents}/>
                    <AgentTable pageData={agentPage}
                                loadPage={loadAgentPage}
                                selectedList={selectedAgents}
                                handleOnChange={handleSelectedAgentsChange}/>
                </>
        }
    ];

    return (
        <>
            <Grid item xs={12}>
                <PageHeader
                    icon={<PeopleOutlineIcon/>}
                    title='Subunit Form'
                    subtitle='subunit subtitle is here'/>
            </Grid>
            <Grid item xs={12}>
                <Paper square className={classes.paper}>
                    <HorizontalLinearStepper
                        steps={steps}
                        handleFinish={handleFinish}
                        nextButtonIsActive={nextButtonIsActive}/>
                </Paper>
            </Grid>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="secondary"/>
            </Backdrop>
        </>
    );
}

export default AgentContractorAssignmentPage;
