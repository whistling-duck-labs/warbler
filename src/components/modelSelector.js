import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';
import AddModelForm from './addModelForm'

let listItemStyle = {backgroundColor: 'grey'}

class ModelSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedModel: 1
    }
  }

  handleSelect (evt, idx) {
    this.props.update(idx)
    this.setState({selectedModel: idx})
  }

  render() {
    let models = this.props.models
    if (models) console.log('true')
    let count = 0;
    return (
      <div className="modelSelector">
        <List style={{maxHeight: '100%', overflow: 'auto', marginRight: 20}}>
          <div className="dbTitle">{this.props.dbName}</div>
          {
            models && models.keySeq().map(key => {
              let selectedStyle = null;
              count++;
              if (key === this.state.selectedModel) selectedStyle = listItemStyle
              console.log(key, '===', this.state.selectedModel)

              if (key !== 'name') {
                return (
                  <ListItem
                    primaryText={models.get(key).get('name')}
                    key={count}
                    onClick={() => this.handleSelect(event, key)}
                    style={ selectedStyle }
                  />
                )
              }
            })
          }
        </List>
        <AddModelForm
          handleChange={(event) => this.props.handleModelChange(event)}
          handleAdd={() => this.props.handleModelAdd()}
          modelValue={this.props.modelValue}
        />
      </div>
    )
  }
}

export default ModelSelector
