import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PageOne from "../page/PageOne";
import PageThree from "../page/PageThree";
import PageTwo from "../page/PageTwo";
import CentralGuildPage from "../page/centralguild/CentralGuildPage";
import ProvinceGuildPage from "../page/Provinceguild/ProvinceGuildPage";
import CountryDivisionPage from "../page/countrydivision/CountryDivisionPage";
import TagCompanyPage from "../page/tagcompany/TagCompanyPage";
import ContractorPage from "../page/contractor/ContractorPage";
import AgentPage from "../page/agent/AgentPage";
import SubUnitActivityPage from "../page/subunit_activity/SubUnitActivityPage";


const PageContent = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <PageOne/>
            </Route>
            <Route path='/pagetwo'>
                <PageTwo/>
            </Route>
            <Route path='/pagethree'>
                <PageThree/>
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
        </Switch>
    );
}

export default PageContent;