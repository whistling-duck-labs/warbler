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

const ModelTable = (props) => {
  let properties = props.model.get('attributes')
  let modName = props.model.get('name')
  console.log('model', modName)
  return (
    <div className="tableContainer">
      <div className="dbTitle">Properties for: {modName}</div>
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
          {properties && properties.map((colMap, idx) => {
            return (
              <TableRow key={idx}>
                <TableRowColumn>{colMap.get('name')}</TableRowColumn>
                <TableRowColumn>{colMap.get('type')}</TableRowColumn>
                <TableRowColumn>
                  <div className="tableButtons">
                    <FloatingActionButton
                      className="deleteButton"
                      onClick={(event) => props.deleteCol(event, idx)}
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
