import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Router, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {blueGrey500, deepOrange500} from 'material-ui/styles/colors';
import { DatabaseSelect, MigrationController, SplashScreen } from './components'
import createHashHistory from 'history/createHashHistory'
import store from './store'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    accent1Color: deepOrange500
  }
})

const newHistory = createHashHistory();

const Routes = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
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
