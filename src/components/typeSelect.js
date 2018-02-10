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
        onChange={this.handleChange}
        value={this.state.value}
        className={this.props.cName}
        labelStyle={this.props.lStyle}
        underlineStyle={this.props.uStyle}
      >
          <MenuItem
            value="STRING"
            primaryText="STRING"
          />
          <MenuItem
            value="INTEGER"
            primaryText="INTEGER"
          />
          <MenuItem
            value="FLOAT"
            primaryText="FLOAT"
          />
          <MenuItem
            value="TEXT"
            primaryText="TEXT"
          />
          <MenuItem
            value="DATE"
            primaryText="DATE"
          />
          <MenuItem
            value="BOOLEAN"
            primaryText="BOOLEAN"
          />
      </SelectField>
    )
  }
}
