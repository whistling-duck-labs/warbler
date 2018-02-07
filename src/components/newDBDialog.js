import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import CreateNewDB from '../../scripts/createNewDB'
import { fetchDbNames } from '../store/dbList'
import { connect } from 'react-redux'
import { setDbUrl } from '../store/dbUrl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class NewDBDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      dbName: ''
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleOpen () {
    this.setState({open: true})
  }

  handleClose () {
    this.setState({open: false})
  }

  handleChange(event) {
    this.setState({dbName: event.target.value})
    console.log(this.state.dbName)
  }

  handleKeyPress(event) {
    event.preventDefault()
    CreateNewDB(this.state.dbName)
      .then(() => this.props.fetchDbNames())
      .then(() => this.props.setDbUrl('postgres://localhost:5432/' + this.state.dbName))
      .then(() => {
        this.props.history.push('/control')
      })
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <FloatingActionButton onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Create a new database"
          contentStyle={{width: 400}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="dbName"
            floatingLabelText="Type a name and hit enter"
            value={this.state.dbName}
            fullWidth
            onChange={this.handleChange}
            onKeyPress={event => {
              if(event.key === 'Enter')
                this.handleKeyPress(event)
          }}
          />
        </Dialog>
      </div>
    )
  }
}

const mapDispatch = {fetchDbNames, setDbUrl}

export default connect(null, mapDispatch)(NewDBDialog)
