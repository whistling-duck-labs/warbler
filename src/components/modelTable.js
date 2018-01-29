import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const ModelTable = (props) => {
  let properties = props.model.get('attributes')
  return (
    <div className="tableContainer">
      <Table className="modelTable">
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Property</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((colMap, idx) => {
            console.log('doing mapping')
            return (
              <TableRow key={idx}>
                <TableRowColumn>{colMap.get('name')}</TableRowColumn>
                <TableRowColumn>{colMap.get('type')}</TableRowColumn>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ModelTable
