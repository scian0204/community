import React from 'react';
import axios from 'axios';
import CmtList from '../components/CmtList';
import PostList from '../components/PostList';
import {Link} from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        userid: null,
      },
      isLoading: false,
      rows: [],
      pMode: 'post',
      circleStyle: {
        "width": "150px",
        "height": "150px",
        "WebkitBorderRadius": "700px",
        "MozBorderRadius": "700px",
        "borderRadius": "700px",
        "backgroundColor": "gray",
      }
    };
    const { location, history } = this.props;
    if (location.state === undefined) {
        history.push('/');
    }
    this.state.queryData.userid = location.state;
    axios.post('http://localhost:3002/api/profile', this.state.queryData)
        .then(data=>this.setState({rows:data.data.result.rows, isLoading: true}));
  }

  changePmode = (p) => {
    this.setState({pMode: p})
    // console.log(p);
  }

  render() {
    if (!this.state.isLoading) {
      console.log(this.state.rows);
      return <h4>loading...</h4>
    } else {
      let {rows} = this.state;
      const row = rows[0];
    return (
      // <div className="container-fluid">
        <div className="jumbotron">
          <div className="float-left">
            {row.image !== null ? 
              <img style={this.state.circleStyle} src={`http://localhost:3002/api/image?fileName=${row.image}`} /> :
              <div style={this.state.circleStyle}> </div>
            }
          </div>
          <br /> 
          <h2 className="display-4">{row.username}</h2>
          {/* <% if(isLogin && !username.equals("admin")) { %>
          <% if(uid.equals(session.getAttribute("uid")) || session.getAttribute("isAdmin") != null) { %>
            <div className="float-right">
              <a className="btn btn-danger" href="delete.jsp?tableName=member&id=<%= rs.getString("useridx") %>">����</a> 
              <a className="btn btn-warning" href="update.jsp?tableName=member&id=<%= rs.getString("useridx") %>">����</a> 
            </div>
          <% } %>
          <% } %> */}
          <br /><br /><br />
          <hr className="my-4" />
          <div className="card text-left">
            <div className="card-header">
                {this.state.pMode === 'post' ? 
                  <div>
                    <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item"><span className="nav-link active">작성 글</span></li>
                      <li onClick={this.changePmode.bind(this, 'cmt')} className="nav-item"><span className="nav-link">작성 댓글</span></li>
                      <li onClick={this.changePmode.bind(this, 'guest')} className="nav-item"><span className="nav-link">방명록</span></li>
                    </ul>
                  </div> : 
                this.state.pMode === 'cmt' ? 
                  <div>
                    <ul className="nav nav-tabs card-header-tabs">
                      <li onClick={this.changePmode.bind(this, 'post')} className="nav-item"><span className="nav-link">작성 글</span></li>
                      <li className="nav-item"><span className="nav-link active">작성 댓글</span></li>
                      <li onClick={this.changePmode.bind(this, 'guest')} className="nav-item"><span className="nav-link">방명록</span></li>
                    </ul>
                  </div> : 
                this.state.pMode === 'guest' ? 
                  <div>
                    <ul className="nav nav-tabs card-header-tabs">
                      <li onClick={this.changePmode.bind(this, 'post')} className="nav-item"><span className="nav-link">작성 글</span></li>
                      <li onClick={this.changePmode.bind(this, 'cmt')} className="nav-item"><span className="nav-link">작성 댓글</span></li>
                      <li className="nav-item"><span className="nav-link active">방명록</span></li>
                    </ul>
                  </div> : ""
                }
            </div>
            <div className="card-body">
                {this.state.pMode === 'post' ? 
                  <div>
                    <PostList username={row.username} />
                  </div> : 
                this.state.pMode === 'cmt' ? 
                  <div>
                    <CmtList username={row.username} />
                  </div> : 
                this.state.pMode === 'guest' ? 
                  <div>
                    방명록
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

export default Profile;
