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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
    fetch('http://localhost:3002/api')
        .then(res=>res.json())
        .then(data=>this.setState({rows:data.result.rows}));
  }

  render() {
    let {rows} = this.state;
    console.log(rows);
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
        {rows.map(row => {
          return <span>{row.title} / </span>
        })}
      </HashRouter>
    );
  }
}

export default App;
