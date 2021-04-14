import React from 'react';
import axios from 'axios';
import CmtList from '../components/CmtList';
import Comment from '../components/Comment';
import {Link} from 'react-router-dom';

class PostShow extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        queryData: {
          postid: null,
        },
        isLoading: false,
        rows: [],
        recmd: 0
      };
      const { location, history } = this.props;
      if (!location.state) {
          history.push('/');
      }else {
        this.state.queryData.postid = location.state.postid;
      }
      axios.post('http://localhost:3002/api/postShow', this.state.queryData)
          .then(data=>this.setState({rows:data.data.result.rows, isLoading: true}));
    }
    
    render() {
        if (this.state.isLoading) {
            let {rows} = this.state;
            const row = rows[0];
            // console.log(row);
            return (
                // <div className="container-fluid">
                    <div className="jumbotron">
                        <h2 className="display-4">{row.title}</h2>
                        <div className="float-right">
                            글쓴이 : <Link
                                        to = {{
                                            pathname: '/Profile',
                                            state: row.userid,
                                        }}>{row.username}</Link><br />
                            등록일 : {row.writedate.substring(0, 10)} <br />
                            조회수 : {row.viewcnt} <br />
                            {/* <% if(isLogin) { %>
                            <% if(rs.getString("userid").equals(session.getAttribute("uid")) || session.getAttribute("isAdmin") != null) { %>
                                <div className="float-right">
                                    <a className="btn btn-danger" href="delete.jsp?tableName=post&id=<%= rs.getInt(1) %>">����</a> 
                                    <a className="btn btn-warning" href="update.jsp?tableName=post&id=<%= rs.getInt(1) %>">����</a> 
                                </div>
                            <% } %>
                            <% } %> */}
                        </div>
    
                        <br /><br /><br /><br />
                        <hr className="my-4" />
                        
                        {row.image === null ? <br/> :
                            <div>
                                <img src={`http://localhost:3002/api/image?fileName=${row.image}`} width="50%"/> <hr />
                            </div>
                        }
                        <p>{row.content}</p>
                        <br /><br /><br />
                        <div style={{textAlign: "center"}} className="center-block">
                            <h5>{row.recmd}</h5>
                            <button style={{textAlign: "center"}} className="btn btn-primary">추천 </button>
                            <button style={{textAlign: "center"}} className="btn btn-warning">비추 </button>
                        </div>
                        <br /><br /><br />
                        <hr className="my-4" />
                        {false ? <Comment /> : null}
                        <CmtList postid={this.state.queryData.postid} />
                    </div>
                // </div>
            );
        }else {
            return <div>Loading...</div>
        }
    }
}

export default PostShow;
