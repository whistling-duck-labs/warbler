import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { DatabaseSelect, Main } from './components'

import createHashHistory from 'history/createHashHistory'

const newHistory = createHashHistory();

console.log(newHistory)

export default class Routes extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <MuiThemeProvider>
        <Router history={newHistory}>
          <Main>
            <Switch>
              <Route path="/" component={DatabaseSelect} />
            </Switch>
          </Main>
        </Router>
      </MuiThemeProvider>
    )
  }
}
