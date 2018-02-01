import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class ConfirmUndo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen () {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Undo all changes"
        secondary
        onClick={() => {
          this.handleClose()
          this.props.fetchDb(this.props.dbName)
        }}
      />
    ];

    return (
      <div>
        <RaisedButton className='button-undo' primary label='Undo' onClick={() =>
          this.handleOpen()}
        />
        <Dialog
          title="Undo changes"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Are you sure you want to permanently undo unsaved changes to {this.props.dbName}?
        </Dialog>
      </div>
    );
  }

}
