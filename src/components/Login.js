import React from 'react';
// import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loginData: {
              id: null,
              pw: null,
          }, 
          rows: [],
      };
      this.handleChangeId = this.handleChangeId.bind(this);
      this.handleChangePw = this.handleChangePw.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    //   axios.post('http://cianas.kro.kr:3002/api/boardList')
    //         .then(data=>this.setState({rows:data.data.result.rows}));
    //   console.log(this.state.rows);
    }

    handleChangeId = (e) => {
        // this.state.loginData.id = e.target.value;
        let id = e.target.value;
        this.setState({loginData: {...this.state.loginData, id: id}})
    }
    
    handleChangePw = (e) => {
        let pw = e.target.value;
        this.setState({loginData: {...this.state.loginData, pw: pw}})
        // this.state.loginData.pw = e.target.value;
    }

    handleSubmit = (e) => {
        console.log(this.state.loginData);
        e.preventDefault();
    }

    render() {
        return (
            <div style={{border: '1px solid blue', padding: '10px'}}>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID</label>
                        <input type="text" className="form-control" onChange={this.handleChangeId}  id="id" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={this.handleChangePw} id="Password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">로그인</button>
                    <button className="btn btn-warning">회원가입</button>
                </form>
            </div>
        );
    }
}

export default Login;
