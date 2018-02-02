import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
const remote = require('electron').remote
import { Dialog, RaisedButton, Checkbox, Divider } from 'material-ui'

export default class ConfirmMigration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      checked: true
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
    remote.dialog.showOpenDialog({properties: ['openDirectory']}, (directory) => console.log(directory))
  }

  render() {
    const actions = [
      <RaisedButton
      label="Choose Directory"
      primary
      onClick={() => {
        this.openDirectory()
      }}
      />,
      <RaisedButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Migrate"
        secondary
        onClick={() => {
          this.handleClose()
          this.props.runMigration(this.props.dbName, this.state.checked)
        }}
      />
    ]

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
