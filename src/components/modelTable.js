import React from 'react'
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
import FlatButton from 'material-ui/FlatButton';
import { sortImmutableByKeys } from './modelSelector'

const ModelTable = (props) => {
  if (!props.model) return ''
  let properties = props.model.get('attributes')
  let propertyKeysArr = sortImmutableByKeys(properties)
  return (
    <div className="tableContainer">
      <Table
        className="modelTable"
        style={{tableLayout: "auto"}}
      >
        <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Property</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} style={{width: '100%'}}>
          {properties && propertyKeysArr.map((key, idx) => {
            return (
              <TableRow key={idx}>
                <TableRowColumn>{properties.get(key).get('name')}</TableRowColumn>
                <TableRowColumn>{properties.get(key).get('type')}</TableRowColumn>
                <TableRowColumn>
                  <div className="tableButtons">
                    <FlatButton label="EDIT" />
                    <FloatingActionButton
                      className="deleteButton"
                      onClick={(event) => props.deleteCol(event, key)}
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

export default ModelTable
