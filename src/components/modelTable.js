import React, {Component} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import SaveIcon from 'material-ui/svg-icons/content/save'
import FlatButton from 'material-ui/FlatButton';
import { sortImmutableByKeys } from './modelSelector'
import TextField from 'material-ui/TextField';
import TypeSelect from './typeSelect';

class ModelTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openColumns: [],
      changes: {}
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.modelKey !== nextProps.modelKey) {
      this.setState({openColumns: [], changes: []})
    }
  }

  openCol (event, key) {
    this.setState({openColumns: this.state.openColumns.concat(key)})
  }

  saveChange (event, key) {
    this.props.editCol(event, key, this.state.changes[key])
    this.setState({openColumns: this.state.openColumns.filter(col => col !== key)})
  }

  handleNameChange (event, key) {
    if (this.state.changes[key]) {
      let changeObj = this.state.changes
      changeObj[key].name = event.target.value
      this.setState({changes: changeObj})
    }
    else {
      let changeObj = this.state.changes
      changeObj[key] = {name: event.target.value, type: this.props.model.get('attributes').get(key).get('type')}
      this.setState({changes: changeObj})
    }
  }

  handleTypeChange (value, key) {
    if (this.state.changes[key]) {
      let changeObj = this.state.changes
      changeObj[key].type = value
      this.setState({changes: changeObj})
    }
    else {
      let changeObj = this.state.changes
      changeObj[key] = {name: this.props.model.get('attributes').get(key).get('name'), type: value}
      this.setState({changes: changeObj})
    }
  }

  render () {
    if (!this.props.model) return ''
    let properties = this.props.model.get('attributes')
    let propertyKeysArr = sortImmutableByKeys(properties)
    return (
      <div className="tableContainer">
        <Table
          className="modelTable"
          style={{tableLayout: 'auto'}}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow className="tableHeader">
              <TableHeaderColumn>Property</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} style={{width: '100%'}}>
            {properties && propertyKeysArr.map(key => {
              return (
                <TableRow key={key}>
                  <TableRowColumn>
                    {
                      this.state.openColumns.includes(key)
                        ?
                      <TextField
                        onChange={(event) => this.handleNameChange(event, key)}
                        defaultValue={properties.get(key).get('name')}
                        name="editColName"
                        className="editColName"
                        underlineStyle={{bottom: 0}}
                      />
                        :
                      properties.get(key).get('name')
                    }
                  </TableRowColumn>
                  <TableRowColumn>
                    {
                      this.state.openColumns.includes(key)
                        ?
                      <TypeSelect
                      defaultValue={properties.get(key).get('type')}
                      handleTypeChange={value => this.handleTypeChange(value, key)}
                      cName="editType"
                      lStyle={{height: 40, paddingRight: 0}}
                      uStyle={{width: 0, height: 0}}
                      />
                        :
                      properties.get(key).get('type')
                    }
                  </TableRowColumn>
                  <TableRowColumn>
                    <div className="tableButtons">
                      {
                        !this.state.openColumns.includes(key) ?
                          <FloatingActionButton
                            className="editButton changeButton"
                            mini={true}
                            onClick={(event) => this.openCol(event, key)}
                          >
                            <EditIcon className="editIcon" />
                          </FloatingActionButton>
                        :
                          <FloatingActionButton
                            className="editButton changeButton"
                            mini={true}
                            onClick={(event) => this.saveChange(event, key)}
                          >
                            <SaveIcon className="saveIcon" />
                          </FloatingActionButton>
                      }
                          <FloatingActionButton
                            className="deleteButton"
                            onClick={(event) => this.props.deleteCol(event, key)}
                            mini={true}
                          >
                            <ContentRemove />
                          </FloatingActionButton>
                    </div>
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ModelTable
