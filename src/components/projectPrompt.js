import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog, RaisedButton, Checkbox, Divider } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import {setProjectDirPath} from '../store/project'
const remote = require('electron').remote

class ProjectPrompt extends Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      goToDb: false
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.openDirectory = this.openDirectory.bind(this)
    this.createDirectory = this.createDirectory.bind(this)
    this.loadDbList = this.loadDbList.bind(this)
  }

  handleClose () {
      this.setState({open: false})
      this.props.history.push('/database-select')
  }

  handleOpen () {
    this.setState({open: true})
  }

  openDirectory () {
    remote.dialog.showOpenDialog({properties: ['openDirectory']}, (directory) => {
      this.props.setProjectDirPath(directory[0])
      this.handleClose()
    })
  }

  createDirectory () {
    remote.dialog.showOpenDialog({properties: ['openDirectory', 'createDirectory']}, (directory) => {
      this.props.setProjectDirPath(directory[0])
      this.handleClose()
    })
  }

  loadDbList () {
    this.handleClose()
  }

  render() {
    const actions = (
      <div className='project-prompt-action'>
        <div className='folder' onClick={this.loadDbList}>
          <img src='../app/db-icon-2.png' alt="allDBs"/>
          <h2>Go to all databases</h2>
        </div>
        <div className='folder' onClick={this.openDirectory}>
          <img src='../resources/icons/folder.png' alt="Import"/>
          <h2>Import a Project</h2>
        </div>
        <div className='folder' onClick={this.createDirectory}>
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

const mapStateToProps = state => ({
  projectDirPath: state.get('projectDirPath')
})

const mapDispatchToProps = {setProjectDirPath}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPrompt)
