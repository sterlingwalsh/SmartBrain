import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'c7586c79ca384fc8a15d522745d555b0'
 });

const particlesOptions = {
  particles: {
    number:{
      value:30,
      density:{
        enable:true, 
        value_area:800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box:{}
    }
  }
  
calculateFaceLocations = (data) => {
  console.log(data);
  const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  console.log(width, height);
}

  onInputChange = (evt) => {
    this.setState({input:evt.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocations(response))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" 
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
