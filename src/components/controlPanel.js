import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import runMigration from '../../scripts/migrationScript'
import {fetchDb} from '../store/db'
import Dialog from 'material-ui/Dialog'
import ConfirmUndo from './confirmUndo'
import ConfirmMigration from './confirmMigration'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const ControlPanel = (props) => (
  <Toolbar>
    <ToolbarGroup firstChild={true}>
      <RaisedButton className='button-databases' default label='Databases' onClick={() => props.returnToDbs()}
      />
    </ToolbarGroup>
    <ToolbarGroup>
      <ConfirmUndo fetchDb={props.fetchDb} dbName={props.dbName} />
      <ToolbarSeparator />
      <ConfirmMigration runMigration={props.runMigration} dbName={props.dbName} />
    </ToolbarGroup>
  </Toolbar>
)

const mapState = state => ({
  dbName: state.get('dbUrl').replace('postgres://localhost:5432/', '')
})

const mapDispatch = dispatch => {
  return {
    runMigration (shouldGenerateModels, directory, dbName) {
      runMigration(shouldGenerateModels, directory)
      dispatch(fetchDb(dbName))
    },
    fetchDb (dbName) {
      dispatch(fetchDb(dbName))
    }
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)
