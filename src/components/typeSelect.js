import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class TypeSelect extends Component {
  constructor (props) {
    super(props)
    let initValue = this.props.defaultValue || 'STRING'
    this.state = {
      value: initValue
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
          <MenuItem
            value="STRING"
            primaryText="string"
          />
          <MenuItem
            value="INTEGER"
            primaryText="integer"
          />
          <MenuItem
            value="FLOAT"
            primaryText="float"
          />
          <MenuItem
            value="TEXT"
            primaryText="text"
          />
          <MenuItem
            value="DATE"
            primaryText="date"
          />
          <MenuItem
            value="BOOLEAN"
            primaryText="boolean"
          />
      </SelectField>
    )
  }
}
