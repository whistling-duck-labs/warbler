import React, { Component } from 'react'
import { Dialog, RaisedButton, Checkbox, Divider } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
const remote = require('electron').remote

export default class ProjectPrompt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      directory: ''
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.openDirectory = this.openDirectory.bind(this)
  }

  handleClose () {
    if(this.state.directory) {
      this.setState({open: false})
      this.props.history.push('/database-select')
    }
  }

  handleOpen () {
    this.setState({open: true})
  }

  openDirectory () {
    remote.dialog.showOpenDialog({properties: ['openDirectory']}, (directory) => {
      this.setState({directory})
      this.handleClose()
    })
  }

  render() {
    const actions = (
      <div className='project-prompt-action'>
        <div className='folder' onClick={this.openDirectory}>
          <img src='../resources/icons/folder.png' alt="Import"/>
          <h2>Import a Project</h2>
        </div>
        <div className='folder' onClick={this.openDirectory}>
            <img src='../resources/icons/folder.png' alt="Create"/>
            <h2>Create a New Project</h2>
        </div>
      </div>
    )

    return (
      <div>
        <RaisedButton
          onClick={this.handleOpen}
          primary
        >
          Go
        </RaisedButton>
        <Dialog
          className='project-prompt-modal'
          title="Select a Project"
          actions={actions}
          modal={true}
          open={this.state.open}
          transitionDuration={2222}
        >
        </Dialog>
      </div>
    )
  }
}
