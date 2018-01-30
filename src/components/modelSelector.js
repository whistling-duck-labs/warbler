import React from 'react'
import {List, ListItem} from 'material-ui/List';

const ModelSelector = (props) => {
  const handleSelect = (evt, idx) => {
    props.update(idx)
  }

  let models = props.models
  return (
    <List>
      <div>{props.dbName}</div>
      {
        models.map((model, idx) => {
          return (
            <ListItem primaryText={model.get('name')} key={idx} onClick={() => handleSelect(event, idx)} />
          )
        })
      }
    </List>
  )
}

export default ModelSelector
