import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import Signin from './components/signin/Signin'
import Register from './components/register/Register'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Particles from 'react-particles-js'

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

const states = {signin:["signin"], home:['home'], register:['register'], signout:['signout']};

const initialState = {
  input: '',
  imageUrl:'',
  box:{},
  route:states.signin,
  isSignedIn:false,
  user:{
    id:'',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (currentUser) =>{
    const{id, name, email, entries, joined} = currentUser;
    this.setState({user:{
      id, name, email, entries, joined
    }});
    console.log("state", this.state);
  }  

  calculateFaceLocations = (data) => {
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height),
    }
  }

  displayFaceBox = (box) => this.setState({box:box});

  onInputChange = (evt) => this.setState({input:evt.target.value});

  onImageSubmit = () => {
    const {input} = this.state;
    this.setState({imageUrl:input});
    fetch('http://localhost:3001/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({input: this.state.input}),
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.user.id}),
          })
          .then(response => response.json())
          .then(entries => {
              this.setState(Object.assign(this.state.user, {entries}));
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocations(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if (route === states.signin || route === states.register){
      this.setState(initialState);
    }else if(route === states.home){
      this.setState({isSignedIn:true});
    }
    this.setState({route});
  }

  // Route change functions to be passed to components
  routeChangeHome = () => this.onRouteChange(states.home);
  routeChangeSignin = () => this.onRouteChange(states.signin);
  routeChangeRegister = () => this.onRouteChange(states.register);

  render() {
      
    const {route, box, imageUrl, isSignedIn} = this.state;
    let component = null;
    // determine contents of page based on current state
    switch(route){
      case states.home:
        component = <div>  
          <Logo />
          <Rank user={this.state.user}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onImageSubmit={this.onImageSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>;
        break;
      case states.signin:
        component = <Signin loadUser={this.loadUser} onRouteChangeHome={this.routeChangeHome} onRouteChangeRegister={this.routeChangeRegister}/>
        break;
      case states.register:
        component = <Register onRouteChangeHome={this.routeChangeHome} loadUser={this.loadUser}/>
        break;
    }

      return (
      <div className="App">
        <Particles className="particles" 
          params={particlesOptions} />
        <Navigation 
          onRouteChangeSignout={this.routeChangeSignin} 
          onRouteChangeSignin={this.routeChangeSignin}
          onRouteChangeRegister={this.routeChangeRegister}
          isSignedIn={isSignedIn}/>
        {component}
      </div>
    );
  }
}

export default App;
