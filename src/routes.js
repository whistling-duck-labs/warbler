import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Router, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { DatabaseSelect, MigrationController, SplashScreen } from './components'
import createHashHistory from 'history/createHashHistory'
import store from './store'

const newHistory = createHashHistory();

const Routes = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={newHistory}>
          <Switch>
            <Route path="/control" component={MigrationController} />
            <Route path="/database-select" component={DatabaseSelect} />
            <Route path="/" component={SplashScreen} />
          </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

export default Routes
