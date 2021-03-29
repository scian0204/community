import React from 'react';
import PostList from '../components/PostList';
import BoardList from '../components/BoardList';
// import Login from '../components/Login';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          boardid: 1,
      };
    }

    render() {
        return (
            <div>
            <br/>
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-sm-2'><BoardList /></div>
                        <div className='col-sm-8'><PostList boardid={this.state.boardid} /></div>
                        <div className='col-sm-2'>Login</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
