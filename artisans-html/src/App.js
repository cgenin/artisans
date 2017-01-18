import React, {Component} from 'react';
import {Router, Route, IndexRoute,Redirect, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Here we define all our material-ui ReactComponents.
import Master from './components/Master';
import Home from './components/pages/Home';

import RequiredKnowledge from './components/pages/get-started/RequiredKnowledge';

import Themes from './components/pages/customization/Themes';



injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Master}>
          <IndexRoute component={Home} />
          <Route path="home" component={Home} />
          <Redirect from="get-started" to="/get-started/required-knowledge" />
          <Route path="get-started">
            <Route path="required-knowledge" component={RequiredKnowledge} />

          </Route>
          <Redirect from="customization" to="/customization/themes" />
          <Route path="customization">

            <Route path="themes" component={Themes} />

          </Route>

        </Route>
      </Router>
    );
  }
}

export default App;
