import './style/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import Cookies from "js-cookie";
import { createContext, useState } from 'react';
import Register from './components/Register.js';
import login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NavigationBar from './components/NavgationBar';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
export const context = createContext(null);


function App() {
  const [user, setUser] = useState({ name: null, email: null, contact: null });
  const [nav, setNav] = useState(true);
  // alert(Cookies.get('person'))
  // alert(document.cookie)

  return (
    <>
      <context.Provider value={{ user, setUser, nav, setNav }}>
        <Router>
          <div>
            {nav && <NavigationBar />}
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Cookies.get('person') === 'admin' ? Register : ErrorPage} />
              <Route exact path='/login/:person' component={login} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/dashboard' component={Cookies.get('person') === 'admin' ? Dashboard : ErrorPage} />
            </Switch>
          </div>
        </Router>
      </context.Provider>

    </>
  );
}

export default App;
