import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {connect} from 'react-redux'
import {fetchDbNames} from '../store/dbList'
import {fetchDb} from '../store/db'

class DatabaseSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dbList: this.props.dbList
    }
  }
  componentDidMount () {
    this.props.fetchDbNames()
  }

  onSelect (dbname) {
    this.props.fetchDb(dbname)
    this.props.history.push('/control')
  }

  render () {
    return (
      <div className="databaseCards">
        {this.props.dbList && this.props.dbList.map((name, idx) => {
          return (
            <Card key={idx} onClick={() => this.onSelect(name)} className="dbCard">
              <CardText className="dbCardText" style={{fontSize: 11}}>
                {name}
              </CardText>
            </Card>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  dbList: state.get('dbList')
})

const mapDispatch = {fetchDbNames, fetchDb}

export default connect(mapState, mapDispatch)(DatabaseSelect)