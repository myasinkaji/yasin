import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CentralGuildPage from "../page/centralguild/CentralGuildPage";
import ProvinceGuildPage from "../page/Provinceguild/ProvinceGuildPage";
import CountryDivisionPage from "../page/countrydivision/CountryDivisionPage";
import TagCompanyPage from "../page/tagcompany/TagCompanyPage";
import ContractorPage from "../page/contractor/ContractorPage";
import AgentPage from "../page/agent/AgentPage";
import SubUnitActivityPage from "../page/subunit_activity/SubUnitActivityPage";
import HerdPage from "../page/herd/HerdPage";
import SubunitPage from "../page/subunit/SubunitPage";
import RancherPage from "../page/rancher/RancherPage";
import AgentContractorAssignmentPage from "../page/agent_contractor_assignment/AgentContractorAssignmentPage";
import TagRequestPage from "../page/tagrequest/TagRequestPage";
import CentralGuildCartablePage from "../page/centralguildcartable/CentralGuildCartablePage";
import CompanyCartablePage from "../page/companycartable/CompanyCartablePage";
import CentralGuildTagStorePage from "../page/centralguildtagstore/CentralGuildTagStorePage";
import CompanyTagStorePage from "../page/companytagstore/CompanyTagStorePage";


const PageContent = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <CentralGuildPage/>
            </Route>
            <Route exact path='/central-guild'>
                <CentralGuildPage/>
            </Route>
            <Route path='/province-guild'>
                <ProvinceGuildPage/>
            </Route>
            <Route path='/country-division'>
                <CountryDivisionPage/>
            </Route>
            <Route path='/tag-company'>
                <TagCompanyPage/>
            </Route>
            <Route path='/contractor'>
                <ContractorPage/>
            </Route>
            <Route path='/agent'>
                <AgentPage/>
            </Route>
            <Route path='/subunitactivity'>
                <SubUnitActivityPage />
            </Route>
            <Route path='/subunit'>
                <SubunitPage />
            </Route>
            <Route path='/herd'>
                <HerdPage />
            </Route>
            <Route path='/rancher'>
                <RancherPage />
            </Route>
            <Route path='/agent-contractor'>
                <AgentContractorAssignmentPage />
            </Route>
            <Route path='/tag-request'>
                <TagRequestPage />
            </Route>
            <Route path='/cguild-cartable'>
                <CentralGuildCartablePage />
            </Route>
            <Route path='/comp-cartable'>
                <CompanyCartablePage />
            </Route>
            <Route path='/cguild-tag-store'>
                <CentralGuildTagStorePage />
            </Route>
            <Route path='/comp-tag-store'>
                <CompanyTagStorePage />
            </Route>
        </Switch>
    );
}

export default PageContent;