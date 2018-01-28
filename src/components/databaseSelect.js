import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class DatabaseSelect extends Component {

  render () {
    let databaseNames = ['users', 'bananas', 'girlfriends', 'boyfriends'] //TODO: hook this up to the store to grab database names
    console.log('rendering this')
    return (
      <div className="databaseCards">
        {databaseNames.map((name, idx) => {
          return (
            <Card key={idx}>
              <CardText>
                {name}
              </CardText>
            </Card>
          )
        })}
      </div>
    )
  }
}
