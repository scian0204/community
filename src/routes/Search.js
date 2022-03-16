import React from 'react';
import PostList from '../components/PostList';
import BoardShow from '../routes/BoardShow';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: null,
            isLoading: false,
            pMode: 'board',
            rows: [],
        }
        const { location, history } = this.props;

        if (location.state === undefined) {
            history.push('/');
        } else {
            // this.setState({value: location.state})
            this.state.word = location.state.word;
        }
        axios.post('http://cianas.kro.kr:8081/api/search', {like: this.state.word})
            .then(data=>this.setState({rows:data.data.result.rows, isLoading: true}));
    }

    changePmode = (p) => {
      this.setState({pMode: p})
      // console.log(p);
    }

    render() {
        if (!this.state.isLoading) {
          return <h4>loading...</h4>
        } else {
          let {rows} = this.state;
        //   const row = rows[0];
        return (
            <div className="jumbotron">
              <br /> 
              <h2 className="display-4">검색어 : {this.state.word}</h2>
              <br /><br /><br />
              <hr className="my-4" />
              <div className="card text-left">
                <div className="card-header">
                    {this.state.pMode === 'board' ? 
                      <div>
                        <ul className="nav nav-tabs card-header-tabs">
                          <li className="nav-item"><span className="nav-link active">게시판</span></li>
                          <li onClick={this.changePmode.bind(this, 'post')} className="nav-item"><span className="nav-link">게시글</span></li>
                          <li onClick={this.changePmode.bind(this, 'user')} className="nav-item"><span className="nav-link">유저</span></li>
                        </ul>
                      </div> : 
                    this.state.pMode === 'post' ? 
                      <div>
                        <ul className="nav nav-tabs card-header-tabs">
                          <li onClick={this.changePmode.bind(this, 'board')} className="nav-item"><span className="nav-link">게시판</span></li>
                          <li className="nav-item"><span className="nav-link active">게시글</span></li>
                          <li onClick={this.changePmode.bind(this, 'user')} className="nav-item"><span className="nav-link">유저</span></li>
                        </ul>
                      </div> : 
                    this.state.pMode === 'user' ? 
                      <div>
                        <ul className="nav nav-tabs card-header-tabs">
                          <li onClick={this.changePmode.bind(this, 'board')} className="nav-item"><span className="nav-link">게시판</span></li>
                          <li onClick={this.changePmode.bind(this, 'post')} className="nav-item"><span className="nav-link">게시글</span></li>
                          <li className="nav-item"><span className="nav-link active">유저</span></li>
                        </ul>
                      </div> : ""
                    }
                </div>
                <div className="card-body">
                    {this.state.pMode === 'board' ? 
                      <div>
                        <BoardShow history={this.props.history} like={this.state.word}/>
                      </div> : 
                    this.state.pMode === 'post' ? 
                      <div>
                        <PostList like={this.state.word}/>
                      </div> : 
                    this.state.pMode === 'user' ? 
                      <div>
                          {!rows==[] ? rows.map(row=>{
                              return(
                                <div key={row.useridx}>
                                <Link style={{textDecoration: 'none', color: 'black'}} to={{
                                    pathname: '/Profile',
                                    state: row.userid,}}>
                                <div className="card" style={{width: "20%"}}>
                                  <img src={`http://cianas.kro.kr:8081/api/image?fileName=${row.image}`} className="card-img-top" />
                                  <div className="card-body">
                                    <h5 className="card-title">{row.username}({row.userid})</h5>
                                    <p className="card-text">가입일 : {row.regdate.replace('T', ' ').substring(0, 19)}</p>
                                  </div>
                                </div>
                                </Link>
                                <br/>
                                </div>
                                );
                          }) : "검색 결과가 없습니다."}
                      </div> : ""
                    }
                </div>
              </div>
            </div>
          // </div>
        );
        }
    }
}

export default Search;
