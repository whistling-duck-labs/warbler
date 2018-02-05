import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateDB} from '../store/targetDb'
import toastr from 'toastr'
import '../stylesheets/toastr.min.css'

import { ModelTable, AddColumnForm, ControlPanel, ModelSelector } from './'

import {fromJS, Map} from 'immutable'

class MigrationController extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedModel: 1,
      modelToAdd: ''
    }
  }

  addColumn (evt, value) {
    evt.preventDefault();
    let name = value.name
    let type = value.type
    let colObj = fromJS({name, type})
    let newCol = Map(colObj)
    let nextKey = this.props.targetDb.get(this.state.selectedModel.toString()).get('nextAttributeKey')
    let newDb = this.props.targetDb.update(this.state.selectedModel.toString(), model => {
      return model.update('attributes', attr => {
        return attr.set(nextKey.toString(), newCol)
      }).update('nextAttributeKey', () => nextKey + 1)
    })
    this.props.updateDB(newDb)
  }

  deleteColumn (evt, key) {
    let newDb = this.props.targetDb.deleteIn([this.state.selectedModel.toString(), 'attributes', `${key}`]);
    this.props.updateDB(newDb)
  }

  updateSelectedModel (idx) {
    this.setState({selectedModel: idx})
  }

  returnToDatabases () {
    if (this.props.targetDb.equals(this.props.db)) {
      this.props.history.push('/database-select')
    } else {
      toastr.error('Please Migrate or Undo your changes before going back to your databases.')
    }
  }

  handleModelAdd () {
    let nextKey = this.props.targetDb.get('nextModelKey').toString()
    let newModel = fromJS({name: this.state.modelToAdd, attributes: {}, nextAttributeKey: 1})
    let newDb = this.props.targetDb.set(nextKey, newModel).set('nextModelKey', nextKey + 1)
    this.props.updateDB(newDb)
    this.setState({modelToAdd: ''})
  }

  handleModelChange (evt) {
    this.setState({modelToAdd: evt.target.value})
  }

  render() {
    return (
      <div className="migrationControllerContainer">
        <div className="migrationController">
           <div className="modelSelectorContainer">
             <ModelSelector
               models={this.props.targetDb}
               update={(idx) => this.updateSelectedModel(idx)}
               dbName ={this.props.dbName}
               handleModelAdd={() => this.handleModelAdd()}
               handleModelChange={(event) => this.handleModelChange(event)}
               modelValue={this.state.modelToAdd}
               />
           </div>
          <div className="tableFormContainer">
            {
              <ModelTable
                model={this.props.targetDb.get(this.state.selectedModel)}
                deleteCol={(evt, idx) => this.deleteColumn(evt, idx)}
               />
            }
            <AddColumnForm
              submit={(event, value) => this.addColumn(event, value)}
              className="addColumnForm" />
          </div>
        </div>
        <ControlPanel
          className="controlPanel"
          returnToDbs={() => this.returnToDatabases()}
        />
      </div>
    )
  }
}

const mapState = state => ({
  targetDb: state.get('targetDb'),
  db: state.get('db'),
  dbName: state.get('dbUrl').replace('postgres://localhost:5432/', '')
})

const mapDispatch = {updateDB}

export default connect(mapState, mapDispatch)(MigrationController)
