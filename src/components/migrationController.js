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
      selectedModel: '0',
      modelToAdd: '',
      validName: false
    }
  }

  addColumn (evt, value) {
    evt.preventDefault();
    if (value.isValid) {
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
  }

  deleteColumn (evt, key) {
    let newDb = this.props.targetDb.deleteIn([this.state.selectedModel.toString(), 'attributes', `${key}`]);
    this.props.updateDB(newDb)
  }

  deleteModel (evt, key) {
    let newDb = this.props.targetDb.delete(key.toString())
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
    if (this.state.validName) {
      let nextKey = this.props.targetDb.get('nextModelKey').toString()
      let newModel = fromJS({name: this.state.modelToAdd, attributes: {}, nextAttributeKey: 1})
      let newDb = this.props.targetDb.set(nextKey, newModel).set('nextModelKey', nextKey + 1)
      this.props.updateDB(newDb)
      this.setState({modelToAdd: '', validName: false})
    }
  }

  handleModelChange (evt) {
    this.setState({modelToAdd: evt.target.value})
    if (evt.target.value) {
      this.setState({validName: true})
    }
    else {
      this.setState({validName: false})
    }
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
               deleteModel={(evt, idx) => this.deleteModel(evt, idx)}
               />
           </div>
          <div className="tableFormContainer">
            <ModelTable
              model={this.props.targetDb.get(this.state.selectedModel)}
              deleteCol={(evt, idx) => this.deleteColumn(evt, idx)}
            />
            {
              this.state.selectedModel === '0' ?
              <h2>Add or Select a Model</h2> :
              <AddColumnForm
                submit={(event, value) => this.addColumn(event, value)}
                className="addColumnForm"
              />
            }
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
