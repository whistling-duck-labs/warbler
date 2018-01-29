import React, { Component } from 'react'
import {connect} from 'react-redux'
import ModelTable from './modelTable'
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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

  componentDidMount () {
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
        <div className="addColumnContainer">
          <form>
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
            <TextField name="propName"/>
            <SelectField name="type"/>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  db: state.get('db')
})

export default connect(mapState)(MigrationController)
