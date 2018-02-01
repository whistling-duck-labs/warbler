import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import runMigration from '../../scripts/migrationScript'
import {fetchDb} from '../store/db'

const ControlPanel = (props) => (
  <div className="migratePanel">
    <RaisedButton primary label='Migrate' onClick={() => props.runMigration(props.dbName)} />
  </div>
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
    }
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)
