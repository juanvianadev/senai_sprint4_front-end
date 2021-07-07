import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/home/App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
// import { parseJwt, usuarioAutenticado } from './services/auth';


import Login from './pages/login/login';
import NotFound from './pages/notFound/notFound'
import Listar from './pages/Listar/listar';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} /> {/* Home */}
        <Route path="/Login" component={Login} /> {/* Login */}
        <Route path="/Listar" component={Listar} />
        <Route exact path="/notfound" component={NotFound} /> Not Found
        <Redirect to = "/notfound"/> Redireciona para NotFound caso não encontre nenhuma rota
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


