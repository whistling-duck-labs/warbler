import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import runMigration from '../../script_testing/migrationScript'
import {fetchDb} from '../store/db'

const ControlPanel = (props) => (
  <div className="migratePanel">
    <RaisedButton primary label='Migrate' onClick={() => props.runMigration(props.dbName)} />
  </div>
)

const mapState = state => ({
  dbName: state.get('dbUrl').replace('postgres://localhost:5432/', ''),
  targetDb: state.get('targetDb')
})

const mapDispatch = (dispatch, ownProps) => {
  return {
    runMigration (dbName) {
      // TODO: change alerts
      alert('Migrating!')
      runMigration(ownProps.targetDb)
        .then(res => {
          alert('Finished Migrating')
        })
        .catch(console.error)
    }
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)
