import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import {fetchDb} from '../store/db'
import {fetchDbNames} from '../store/dbList'
import {setDbUrl} from '../store/dbUrl'
import {SplashScreen} from './'
import {setTimeout} from 'timers';
import DatabaseIcon from './databaseIcon'


class DatabaseSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dbList: this.props.dbList,
      foo: 10
    }
    this.splashControl = this.splashControl.bind(this)
  }

  componentDidMount () {
    this.props.fetchDbNames()
    setTimeout(this.splashControl, 4000)
  }

  splashControl () {
    this.setState({isLoading: false})
  }

  onSelect (dbname) {
    this.props.fetchDb(dbname)
    this.props.setDbUrl('postgres://localhost:5432/' + dbname)
    this.props.history.push('/control')
  }

  render () {
    return (
      <div className="databaseCards">
        {this.props.dbList.map((name, idx) => {
          return (
            <Card
              key={idx}
              onClick={() => this.onSelect(name)}
              className="dbCard"
            >
              <CardText
                className="dbCardText"
              >
                <DatabaseIcon dbName={name} />
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

const mapDispatch = {fetchDbNames, fetchDb, setDbUrl}

export default connect(mapState, mapDispatch)(DatabaseSelect)
