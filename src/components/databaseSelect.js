import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import {fetchDb} from '../store/db'
import {fetchDbNames} from '../store/dbList'
import {setDbUrl} from '../store/dbUrl'
import {SplashScreen} from './'
import {setTimeout} from 'timers'
import DatabaseIcon from './databaseIcon'
import NewDBDialog from './newDBDialog'

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
    setTimeout(this.splashControl, 1000)
  }

  splashControl () {
    this.setState({isLoading: false})
  }

  onSelect (dbname) {
    this.props.fetchDb(dbname, this.props.history)
    this.props.setDbUrl('postgres://localhost:5432/' + dbname)
  }

  render () {
    const className = this.state.isLoading ? 'databaseCards' : 'databaseCards visible'

    return (
      <div className={className}>
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
        <Card
          className="dbCard"
        >
          <CardText
            className="dbCardText"
          >
            {
              <div>
                <p></p>
                <NewDBDialog history={this.props.history} />
              </div>
            }
          </CardText>
        </Card>
      </div>
    )
  }
}

const mapState = state => ({
  dbList: state.get('dbList')
})

const mapDispatch = {fetchDbNames, fetchDb, setDbUrl}

export default connect(mapState, mapDispatch)(DatabaseSelect)
