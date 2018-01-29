import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import TypeSelect from './typeSelect';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class AddColumnForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: "",
      type: "string"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleChange (event, value){
    this.setState({name: value});
  }

  handleTypeChange (value) {
    this.setState({type: value})
  }

  render () {
    let submit = this.props.submit
    return (
    <div className="addColumnContainer">
      <form onSubmit={(event) => submit(event, this.state)}>
        <FloatingActionButton type="submit">
          <ContentAdd />
        </FloatingActionButton>
        <TextField
        name="propName"
        onChange={this.handleChange}
        />
        <TypeSelect handleTypeChange={this.handleTypeChange} />
      </form>
    </div>
  )}
}
