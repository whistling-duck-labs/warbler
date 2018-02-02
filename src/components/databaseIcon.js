import React, {Component} from 'react'

const DatabaseIcon = (props) => (
  <div className="dbIcon">
    <img src="./warbler-db-pic.png" />
    <p>{props.dbName}</p>
  </div>
)

export default DatabaseIcon
