import React from 'react'
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddModelForm = (props) => {
  return (
    <div className="addModelContainer">
      <FloatingActionButton
        className="addModelButton"
        mini={true}
        style={{marginRight: 20}}
        onClick={props.handleAdd}
      >
        <ContentAdd className="addModelButtonIcon" />
      </FloatingActionButton>
        <TextField
          onChange={props.handleChange}
          id="addModelText"
          value={props.modelValue}
        />
    </div>
  )
}

export default AddModelForm
