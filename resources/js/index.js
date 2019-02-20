import React, {} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App  from './components/App';
import TaskEdit from './components/TaskEdit';

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/:id/edit" component={TaskEdit} />
                    <App/>
                </Switch>
            </div>
        </BrowserRouter>
        , document.getElementById('root')
    );
}
