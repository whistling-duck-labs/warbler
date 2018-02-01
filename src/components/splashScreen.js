import React, {Component} from 'react'

function SplashScreen(props) {
  return (
    <div className="splashContainer">
      <h1>Welcome to Warbler</h1>
      <p>A visualizer for fast database migrations</p>
      <img src="./warbler-image.jpg" className="splashImage" />
    </div>
  )
}

export default SplashScreen
