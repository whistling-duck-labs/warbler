import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';
import AddModelForm from './addModelForm'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

let listItemStyle = {backgroundColor: 'grey'}

export const sortImmutableByKeys = (map) => {
  return Object.keys(map.toJS()).sort((a, b) => Number(a) < Number(b))
}

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
    let modelKeysArr
    if (models) {
      console.log('MODELS', models)
      modelKeysArr = sortImmutableByKeys(models)
      console.log('SORTED MODEL KEYS', modelKeysArr)
    }
    let count = 0;
    return (
      <div className="modelSelector">
        <List className="listContainer">
          <div className="dbTitle">{this.props.dbName}</div>
          {
            models && modelKeysArr.map(key => {
              let selectedStyle = null;
              count++;
              if (key === this.state.selectedModel) selectedStyle = listItemStyle

              if (key !== 'name' && key !== 'nextModelKey') {
                return (
                  <div className="listItemContainer">
                    <ListItem
                      primaryText={models.get(key).get('name')}
                      key={count}
                      onClick={() => this.handleSelect(event, key)}
                      style={ selectedStyle }
                    />
                    <FloatingActionButton
                          className="deleteButton"
                          onClick={(event) => this.props.deleteModel(event, key)}
                          mini={true}
                    >
                      <ContentRemove />
                    </FloatingActionButton>
                  </div>
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
