import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateDB} from '../store/targetDb'

import RaisedButton from 'material-ui/RaisedButton';

import { ModelTable, AddColumnForm, ControlPanel } from './'

import {fromJS, Map} from 'immutable'

class MigrationController extends Component {

  constructor (props) {
    super(props)
    this.state = {
      renderTable: false,
      selectedModel: 0
    }
  }

  onModelSelect (modelIdx) {
    this.setState({renderTable: true, selectedModel: modelIdx})
  }

  onAddColSubmit (evt, value) {
    evt.preventDefault();
    let name = value.name
    let type = value.type
    let colObj = fromJS({name, type})
    let newCol = Map(colObj)
    let newDb = this.props.db.update(0, model => {
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

  render() {

    return (
      <div>
        <h1>I'm running (test)</h1>
        <RaisedButton label="users" onClick={() => this.onModelSelect(0)} />
        {this.state.renderTable ?
           <ModelTable model={this.props.db.get(this.state.selectedModel)} /> :
           null
          }
        <AddColumnForm submit={(event, value) => this.onAddColSubmit(event, value)} />
        <ControlPanel />
      </div>
    )
  }
}

const mapState = state => ({
  db: state.get('targetDb')
})

const mapDispatch = {updateDB}

export default connect(mapState, mapDispatch)(MigrationController)
