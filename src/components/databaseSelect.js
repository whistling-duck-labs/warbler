import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {connect} from 'react-redux'
import {fetchDbNames} from '../store/dbList'
import {fetchDb} from '../store/db'
import {setDbUrl} from '../store/dbUrl'
import { SplashScreen } from './'
import { setTimeout } from 'timers';

class DatabaseSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dbList: this.props.dbList,
      foo: 10
    }
    this.condiRender = this.condiRender.bind(this)
  }

  componentDidMount () {
    this.props.fetchDbNames()
    setTimeout(this.condiRender, 4000);
  }

  condiRender() {
    this.setState({isLoading: false})
  }

  onSelect (dbname) {
    this.props.fetchDb(dbname)
    this.props.setDbUrl('postgres://localhost:5432/' + dbname)
    this.props.history.push('/control')
  }

  render () {
    return (
      this.state.isLoading || !this.props.dbList ? <SplashScreen /> :
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
  console.log('here', state.get('dbList'))
  dbList: state.get('dbList')
})

const mapDispatch = {fetchDbNames, fetchDb, setDbUrl}

export default connect(mapState, mapDispatch)(DatabaseSelect)
