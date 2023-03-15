import './style/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import Register from './components/Register.js';
import login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NavigationBar from './components/NavgationBar';


function App() {

  return (
    <>
      <Router>
        <div>
          {window.location.pathname !== '/dashboard' && <NavigationBar />}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login/:person' component={login} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </Router>

    </>
  );
}

export default App;
