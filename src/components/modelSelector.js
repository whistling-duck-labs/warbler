import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List';

let listItemStyle = {backgroundColor: "grey"}

class ModelSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedModel: 0
    }
  }

  handleSelect (evt, idx) {
    this.props.update(idx)
    this.setState({selectedModel: idx})
  }

  render() {
    let models = this.props.models
    return (
      <div className="modelSelector">
        <List>
          <div className="dbTitle">{this.props.dbName}</div>
          {
            models.map((model, idx) => {
              let selectedStyle = null;
              if (idx === this.state.selectedModel) selectedStyle = listItemStyle
              return (
                <ListItem
                primaryText={model.get('name')}
                key={idx}
                onClick={() => this.handleSelect(event, idx)}
                style={ selectedStyle } />
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default ModelSelector
