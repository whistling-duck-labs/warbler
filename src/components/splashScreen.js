import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchDbNames} from '../store/dbList'
import { setTimeout } from 'timers';
import ProjectPrompt from './projectPrompt'

class SplashScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      isLoading: true
    }
  }

  openModal () {
    this.setState({modalIsOpen: true})
  }

  componentDidMount () {
    this.props.fetchDbNames()
    this.state.isLoading &&
      setTimeout(() => {
        this.setState({isLoading: false})
      }, 1000)
  }

  render () {
    const className = this.state.isLoading ? 'splashContainer' : 'splashContainer visible'
    return (
      <div className={className}>
        <h1>Welcome to Warbler</h1>
        <p>A visualizer for fast database migrations</p>
        <img src="./warbler-image.jpg" className="splashImage" />
        <ProjectPrompt history={this.props.history} />
      </div>
    )
  }
}

const mapDispatchToProps = {fetchDbNames}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
