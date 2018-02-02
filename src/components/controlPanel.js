import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import runMigration from '../../scripts/migrationScript'
import {fetchDb} from '../store/db'
import Dialog from 'material-ui/Dialog'
import ConfirmUndo from './confirmUndo'
import ConfirmMigration from './confirmMigration'

const ControlPanel = (props) => (
  <div className="migratePanel">
    <RaisedButton className='button-databases' default label='Databases' onClick={() =>       props.returnToDbs()}
    />
    <ConfirmUndo fetchDb={props.fetchDb} dbName={props.dbName} />
    <ConfirmMigration runMigration={props.runMigration} dbName={props.dbName} />
  </div>
)

const mapState = state => ({
  dbName: state.get('dbUrl').replace('postgres://localhost:5432/', '')
})

const mapDispatch = dispatch => {
  return {
    runMigration (dbName, shouldGenerateModels) {
      // TODO: change alerts
      alert('Migrating!')
      runMigration(shouldGenerateModels)
        .then(res => {
          alert('Finished Migrating')
        })
        .catch(console.error)
    },
    fetchDb (dbName) {
      dispatch(fetchDb(dbName));
    }
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)
