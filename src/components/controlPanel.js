import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import runMigration from '../../script_testing/migrationScript'
import {fetchDb} from '../store/db'

const ControlPanel = (props) => (
  <div>
    <RaisedButton primary label='Migrate' onClick={props.runMigration} />
  </div>
)

const mapDispatch = dispatch => {
  return {
    runMigration () {
      // TODO: change alerts - get db to fetch from the dbUrl on the store
      alert('Migrating!')
      runMigration()
      alert('Finished Migrating')
      fetchDb('migrate')
    }
  }
}

export default connect(null, mapDispatch)(ControlPanel)
