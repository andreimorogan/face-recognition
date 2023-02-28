import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank.js'
import Particle from './components/Particle/Particle';

import 'tachyons'


function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <Particle />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
