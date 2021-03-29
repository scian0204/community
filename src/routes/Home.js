import React from 'react';
import PostList from '../components/PostList';
import BoardList from '../components/BoardList';
// import Login from '../components/Login';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          boardid: 1,
          flag: false
      };
    }

    checkFlag = () => {
        if (this.state.flag === true) {
            this.setState({flag: false});
            return true;
        }else {
            return false;
        }
    }

    setBoardid = (boardid) => {
        this.setState((e) => ({boardid: boardid, flag: true}));
    }

    render() {
        return (
            <div>
            <br/>
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-sm-2'><BoardList setBid={this.setBoardid} /></div>
                        <div className='col-sm-8'><PostList boardid={this.state.boardid} checkFlag={this.checkFlag} /></div>
                        <div className='col-sm-2'>Login</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
