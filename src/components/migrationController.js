import React, { Component } from 'react'
import ControlPanel from './controlPanel'
import {connect} from 'react-redux'
import {updateDB} from '../store/targetDb'

import ModelTable from './modelTable'
import RaisedButton from 'material-ui/RaisedButton';
import AddColumnForm from './addColumnForm'
import ModelSelector from './modelSelector'

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

  updateSelectedModel (idx) {
    this.setState({selectedModel: idx})
  }

  render() {
    return (
      <div>
        <h1>I'm running (test)</h1>
        <ModelSelector
        models={this.props.db}
        update={(idx) => this.updateSelectedModel(idx)} />
        {this.props.db.get('size') && <ModelTable model={this.props.db.get(this.state.selectedModel)} /> }
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
