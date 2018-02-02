import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Router, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {blue800, red900} from 'material-ui/styles/colors';
import { DatabaseSelect, MigrationController, SplashScreen } from './components'
import createHashHistory from 'history/createHashHistory'
import store from './store'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue800,
    secondary1Color: red900,
    secondaryColor: red900,
    secondary: red900,
    primary2Color: red900,
    primary3Color: red900
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
