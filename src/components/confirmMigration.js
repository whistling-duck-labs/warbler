import React, { Component } from 'react'
import { Dialog, RaisedButton, Checkbox, Divider } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
const remote = require('electron').remote

export default class ConfirmMigration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      checked: true,
      directory: ''
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
  }

  handleOpen () {
    this.setState({open: true})
  }

  handleClose () {
    this.setState({open: false})
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
            onClick={() => {
              this.handleClose()
              this.props.runMigration(this.state.checked, this.state.directory)
            }}
          />
        </ToolbarGroup>
      </Toolbar>
    )

    return (
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
