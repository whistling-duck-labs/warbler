import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class TypeSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'STRING'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, index, value) {
    this.setState({value})
    this.props.handleTypeChange(value)
  }

  render () {
    return (
      <SelectField
        name="type"
        floatingLabelText="Type"
        onChange={this.handleChange}
        value={this.state.value}
        >
          <MenuItem value="STRING" primaryText="STRING" />
          <MenuItem value="INTEGER" primaryText="INTEGER" />
      </SelectField>
    )
  }
}
