import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import TypeSelect from './typeSelect';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class AddColumnForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      type: 'STRING',
      isValid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleChange (event, value){
    this.setState({name: value});
    if (value.length) {
      this.setState({isValid: true})
    }
    else {this.setState({isValid: false})}
  }

  handleTypeChange (value) {
    this.setState({type: value})
  }

  clearField () {
    if (this.state.isValid) {
      this.setState({name: '', isValid: false})
    }
  }

  render () {
    let submit = this.props.submit
    return (
    <div className="addColumnContainer">
      <form
        onSubmit={(event) => {
            submit(event, this.state)
            this.clearField()
          }
        }
        className="addColumnForm"
      >
        <FloatingActionButton
          type="submit"
          className="addColumnButton"
          mini={true}
        >
          <ContentAdd />
        </FloatingActionButton>
        <TextField
          name="propName"
          onChange={this.handleChange}
          className="addColTextField"
          style={{width: '40%'}}
          value={this.state.name}
        />
        <TypeSelect
          handleTypeChange={this.handleTypeChange}
          style={{alignSelf: 'flex-start', marginLeft: 100, flexGrow: 1}}
          className="addColType"
        />
      </form>
    </div>
  )}
}
