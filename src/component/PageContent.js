import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PageOne from "../page/PageOne";
import PageThree from "../page/PageThree";
import PageTwo from "../page/PageTwo";
import CentralGuildPage from "../page/centralguild/CentralGuildPage";


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
        </Switch>
    );
}

export default PageContent;