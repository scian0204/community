import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './routes/Home';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import BoardApprove from './routes/BoardApprove';
import BoardShow from './routes/BoardShow';
import Form from './routes/Form';
import PostShow from './routes/PostShow';
import Profile from './routes/Profile';
import Search from './routes/Search';
import Reload from './routes/Reload';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refrash: false,
    };
    // fetch('http://cianas.kro.kr:3002/api')
    //     .then(res=>res.json())
    //     .then(data=>this.setState({rows:data.result.rows}));
  }

  render() {
    // let {rows} = this.state;
    // console.log(rows);
    return (
      <HashRouter>
        <div className="container-fluid">
          <br/>
          <div className='row'>
            <div className='col-sm-4'>
              <Logo />
            </div>
            <div className='col-sm-4'>
              <SearchBar />
            </div>
            <div className='col-sm-4'>
              {/* <div className="float-right">
                <button onClick={()=>this.setState({refrash: true})} className="btn btn-secondary">새로고침</button>
              </div> */}
            </div>
        </div>
        <Route path="/" exact={true} refresh component={Home} />
        <Route path="/BoardApprove" component={BoardApprove} />
        <Route path="/BoardShow" component={BoardShow} />
        <Route path="/Form" component={Form} />
        <Route path="/PostShow" component={PostShow} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Search" refresh component={Search} />
        <Route path="/Reload" refresh component={Reload} />
        </div>
        {/* {rows.map(row => {
          return <span>{row.title} / </span>
        })} */}
      </HashRouter>
    );
  }
}

export default App;
