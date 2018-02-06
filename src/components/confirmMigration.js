import React, { Component } from 'react'
import { Dialog, RaisedButton, Checkbox, Divider } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import LinearProgress from 'material-ui/LinearProgress';
import {MigrationProgressBar} from './index'
const remote = require('electron').remote

export default class ConfirmMigration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      checked: true,
      directory: '',
      startingMigration: false,
      migrating: false
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
    this.props.runMigration(this.state.checked, this.state.directory, this.props.dbName)
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
            label="Choose Directory"
            primary
            onClick={() => {
              this.openDirectory()
            }}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label="Cancel"
            primary
            onClick={this.handleClose}
          />
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
        <RaisedButton className='button-migrate' secondary label='Migrate' onClick={() =>
          this.handleOpen()}
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
