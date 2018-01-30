import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateDB} from '../store/targetDb'

import { ModelTable, AddColumnForm, ControlPanel, ModelSelector} from './'

import {fromJS, Map} from 'immutable'

class MigrationController extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedModel: 0
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

  render() {
    return (
      <div className="migrationController">
        <ModelSelector
        models={this.props.targetDb}
        update={(idx) => this.updateSelectedModel(idx)}
        className="modelSelector"
        dbName ={this.props.dbName} />
        {this.props.targetDb.size && <ModelTable model={this.props.targetDb.get(this.state.selectedModel)} /> }
        <AddColumnForm submit={(event, value) => this.onAddColSubmit(event, value)} className="addColumnForm"/>
        <ControlPanel />
      </div>
    )
  }
}

const mapState = state => ({
  targetDb: state.get('targetDb'),
  dbName: state.get('dbUrl').replace('postgres://localhost:5432/', '')
})

const mapDispatch = {updateDB}

export default connect(mapState, mapDispatch)(MigrationController)
