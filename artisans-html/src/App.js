import React, {Component} from 'react';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Here we define all our material-ui ReactComponents.
import Master from './components/Master';
import Routes from'./Routes';

import Provider from 'react-redux/lib/components/Provider';
import thunkMiddleware from 'redux-thunk';
import logMiddleware from 'redux-logger';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import rechercher from './redux/rechercher/reducer';
import geolocation from './redux/geolocation/reducer';
import adress from './redux/adress/reducer';

injectTapEventPlugin();


const rootReducer = combineReducers(Object.assign({}, {
  rechercher, geolocation, adress
}));

export const store = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  ? compose(applyMiddleware(thunkMiddleware, logMiddleware()))(createStore)(rootReducer)
  : compose(applyMiddleware(thunkMiddleware))(createStore)(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path={Routes.index.path} component={Master}>
            <IndexRoute getComponent={Routes.index.component}/>
            <Route path={Routes.home.path}  getComponent={Routes.home.component}/>
            <Redirect from={Routes.search.path} to={Routes.search.step0.fullpath}/>
            <Route path={Routes.search.path} getComponent={Routes.search.component}>
              <Route path={Routes.search.step0.path} getComponent={Routes.search.step0.component}/>
              <Route path={Routes.search.step1.path} getComponent={Routes.search.step1.component}/>
              <Route path={Routes.search.step2.path} getComponent={Routes.search.step2.component}/>
              <Route path={Routes.search.step3.path} getComponent={Routes.search.step3.component}/>
            </Route>
            <Route path={Routes.results.path} component={Routes.results.component}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
