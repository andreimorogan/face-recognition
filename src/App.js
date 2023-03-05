import React, { Component } from 'react';
import Clarifai, { COLOR_MODEL } from 'clarifai';
import ParticlesBg from 'particles-bg';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank.js';
import Register from './components/Register/Register';
import 'tachyons'
import './App.css';


const app = new Clarifai.App({
 apiKey: 'e334381dafd341adbf3d086b67332b17'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  console.log(width, height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box});  
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input}); 
  app.models
  .predict(
    {
      id: 'face-detection',
      name: 'face-detection',
      version: '6dc7e46bc9124c5c8824be4822abe105',
      type: 'visual-detector',
    }, this.state.input)
  .then(response => {
    console.log('api response', response);
    this.displayFaceBox(this.calculateFaceLocation(response))
    if (response) {
      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
    }
  })
  .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  } else if(route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

render(){
  const { isSignedIn, imageUrl, route, box} = this.state
  return (
    <>
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
         ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
           </div>
          : (
            route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )        
         
        }
      </div>
      <ParticlesBg type="cobweb" bg={true} />
    </>
  );
}
}

export default App;
