import React, {Component} from 'react';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Here we define all our material-ui ReactComponents.
import Master from './components/Master';
import Routes from'./Routes';


injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={Routes.index.path} component={Master}>
                    <IndexRoute component={Routes.index.component}/>
                    <Route path={Routes.home.path} component={Routes.home.component}/>
                    <Route path={Routes.search.path} component={Routes.search.component}/>
                    <Route path={Routes.results.path} component={Routes.results.component}/>
                </Route>
            </Router>
        );
    }
}

export default App;
