import React, { Component } from 'react'
import { Dialog, RaisedButton, Checkbox, Divider } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import {MigrationProgressBar} from './index'
const remote = require('electron').remote

export default class ConfirmMigration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      checked: true,
      startingMigration: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
    this.handleMigration = this.handleMigration.bind(this)
  }

  handleOpen () {
    this.setState({open: true})
  }

  handleClose () {
    this.setState({open: false})
  }

  handleMigration () {
    this.props.runMigration(this.state.checked, this.props.projectDir)
    this.handleClose()
  }

  updateCheck () {
    this.setState({checked: !this.state.checked})
  }

  openDirectory () {
    remote.dialog.showOpenDialog({properties: ['openDirectory']}, (directory) => this.setState({directory}))
  }

  render() {
    const actions = (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton
            label="Cancel"
            primary
            onClick={this.handleClose}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label="Migrate"
            secondary
            onClick={() => this.setState({startingMigration: true})}
          />
        </ToolbarGroup>
      </Toolbar>
    )

    return this.state.startingMigration ?
      (
       <MigrationProgressBar handleMigration={this.handleMigration} />
      )
    : (
      <div>
        <RaisedButton className='button-migrate' secondary label='Migrate' onClick={ () => this.handleOpen()}
        />
        <Dialog
          title="Execute Migration"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Are you sure you want to migrate changes to {this.props.dbName}?
          <Divider />
          <Checkbox
            label="Export Sequelize model files"
            checked={this.state.checked}
            onCheck={this.updateCheck}
            className='model-export-checkbox'
          />

        </Dialog>
      </div>
    )
  }
}
