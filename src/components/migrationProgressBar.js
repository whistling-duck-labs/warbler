import React, {Component} from 'react'
import {Dialog, LinearProgress} from 'material-ui'

export default class MigrationProgressBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.setState({open: false})
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.props.handleMigration()
      this.handleClose()
    }, 2500)
  }

  render () {
    return  (
      <Dialog
        title='Migrating'
        modal={true}
        open={this.state.open}
      >
        <LinearProgress mode='indeterminate' />
      </Dialog>
    )
  }
}
