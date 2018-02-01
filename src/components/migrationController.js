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
      selectedModel: 0,
      modelToAdd: ''
    }
  }

  onAddColSubmit (evt, value) {
    evt.preventDefault();
    let name = value.name
    let type = value.type
    let colObj = fromJS({name, type})
    let newCol = Map(colObj)
    let newDb = this.props.targetDb.update(this.state.selectedModel, model => {
        return (
          model.update('attributes', attr => {
            return (
              attr.push(newCol)
            )
          })
        )
    })
    this.props.updateDB(newDb)
  }

  updateSelectedModel (idx) {
    this.setState({selectedModel: idx})
  }

  returnToDatabases () {
    if (this.props.targetDb.equals(this.props.db)) {
      this.props.history.push('/')
    } else {
      toastr.error('Please Migrate or Undo your changes before going back to your databases.')
    }
  }

  handleModelAdd () {
    let newModel = Map(fromJS({name: this.state.modelToAdd, attributes: []}))
    let newDb = this.props.targetDb.push(newModel)
    this.props.updateDB(newDb)
    this.setState({modelToAdd: ''})
  }

  handleModelChange (evt) {
    this.setState({modelToAdd: evt.target.value})
  }

  render() {
    return (
      <div className="migrationController">
          <div className="modelSelectorContainer">
          <ModelSelector
          models={this.props.targetDb}
          update={(idx) => this.updateSelectedModel(idx)}
          dbName ={this.props.dbName}
          handleModelAdd={() => this.handleModelAdd()}
          handleModelChange={(event) => this.handleModelChange(event)}
          modelValue={this.state.modelToAdd} />
        </div>
        <div className="tableFormContainer">
          {this.props.targetDb.size && <ModelTable model={this.props.targetDb.get(this.state.selectedModel)} /> }
          <AddColumnForm
          submit={(event, value) => this.onAddColSubmit(event, value)}
          className="addColumnForm" />
        </div>
        <ControlPanel returnToDbs={() => this.returnToDatabases()} />
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
