import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Welcome from './components/Welcome';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Welcome}/>
          <Route path='/home' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/contact-us' component={Contact}/>
          <Route path='/profile' component={Profile}/>
          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
