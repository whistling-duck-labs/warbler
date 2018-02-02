import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchDbNames} from '../store/dbList'
import { setTimeout } from 'timers';

class SplashScreen extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchDbNames()
    console.log(setTimeout.toString())
    setTimeout(() => {
      this.props.history.push('/database-select')
    }, 3000)
  }

  render () {
    return (
      <div className="splashContainer">
        <h1>Welcome to Warbler</h1>
        <p>A visualizer for fast database migrations</p>
        <img src="./warbler-image.jpg" className="splashImage" />
      </div>
    )
  }
}

const mapDispatchToProps = {fetchDbNames}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
