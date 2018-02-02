import React, {Component} from 'react'

function DatabaseIcon(props) {
  return (
    <div className="dbIcon">
    <img src="./warbler-db-pic.png" />
      <p>{props.dbName}</p>
    </div>
  )
}

export default DatabaseIcon
