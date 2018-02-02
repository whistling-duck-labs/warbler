import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import runMigration from '../../scripts/migrationScript'
import {fetchDb} from '../store/db'
import Dialog from 'material-ui/Dialog'
import ConfirmUndo from './confirmUndo'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const ControlPanel = (props) => (
  <Toolbar>
    <ToolbarGroup firstChild={true}>
      <RaisedButton default label='Databases' onClick={() =>       props.returnToDbs()}
      />
    </ToolbarGroup>
    <ToolbarGroup>
      <ConfirmUndo fetchDb={props.fetchDb} dbName={props.dbName} />
      <ToolbarSeparator />
      <RaisedButton secondary label='Migrate' onClick={() =>
      props.runMigration(props.dbName)}
      />
    </ToolbarGroup>
  </Toolbar>
)

const mapState = state => ({
  dbName: state.get('dbUrl').replace('postgres://localhost:5432/', '')
})

const mapDispatch = dispatch => {
  return {
    runMigration (dbName) {
      // TODO: change alerts
      alert('Migrating!')
      runMigration()
        .then(res => {
          alert('Finished Migrating')
          dispatch(fetchDb(dbName))
        })
        .catch(console.error)
    },
    fetchDb (dbName) {
      dispatch(fetchDb(dbName));
    }
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)
