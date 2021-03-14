import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './routes/Home';
import Logo from './components/Logo';
import BoardApprove from './routes/BoardApprove';
import BoardShow from './routes/BoardShow';
import Form from './routes/Form';
import PostShow from './routes/PostShow';
import Profile from './routes/Profile';
import Search from './routes/Search';

function App() {
  return (
    <HashRouter>
      <Logo />
      <Route path="/" exact={true} component={Home} />
      <Route path="/BoardApprove" component={BoardApprove} />
      <Route path="/BoardShow" component={BoardShow} />
      <Route path="/Form" component={Form} />
      <Route path="/PostShow" component={PostShow} />
      <Route path="/Profile" component={Profile} />
      <Route path="/Search" component={Search} />
    </HashRouter>
  );
}

export default App;
