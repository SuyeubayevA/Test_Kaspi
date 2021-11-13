import './App.css';
import {Home} from './pages/Home';
import {Manager} from './pages/Manager';
import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Каспи магазин
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Магазин
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/manager">
              Менеджер
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/manager' component={Manager}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
