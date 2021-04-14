import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CmtList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        postid: null,
        username: null,
      },
      rows: [],
      paging: {
        where: 1,
        wheregroup: 1,
        maxpages: 10,
        maxrows: 10,
      },
      isProfile: false,
    };
    if (!props.postid) {
      this.state.queryData.username = props.username;
      this.state.isProfile = true;

    }else {
      this.state.queryData.postid = props.postid;

    }
    axios.post('http://localhost:3002/api/cmtList', this.state.queryData)
        .then(data=>this.setState({rows:data.data.result.rows}));
  }

  render() {
    let rows = this.state.rows;
    if (rows) {
      const {paging} = this.state;
      let nextgroup = paging.wheregroup + 1;
      let priorgroup = paging.wheregroup - 1;
      let startpage = (paging.wheregroup-1) * this.state.paging.maxpages + 1;
      let endpage = startpage + this.state.paging.maxpages - 1;
      let totalrows = rows.length;
      let totalpages = Number.parseInt((totalrows-1) / paging.maxrows) + 1;
      let startrow = (paging.where-1) * paging.maxrows;
      let endrow = startrow + paging.maxrows - 1;
      if (endrow >= totalrows) endrow = totalrows-1;
      let totalgroup =  Number.parseInt((totalpages-1) / this.state.paging.maxpages) + 1;
      if (endpage > totalpages) endpage = totalpages;
      let tableLoop = [];
      let pageLoop = [];
      for (let i = startrow; i <= endrow; i++) {
        tableLoop.push(i);
      }
      for (let i = startpage; i <= endpage; i++) {
        pageLoop.push(i);
      }
      
      return (
        <div>
          {/* <div id="bdr" style={{"border": "1px solid blue", "padding": "10px"}}> */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {paging.wheregroup > 1 ?
                <ul className="pagination justify-content-center">
                  <li className='page-item'><button onClick={()=>{let where=1;let wheregroup=Number.parseInt((where-1)/this.state.paging.maxpages)+1;this.setState({paging: {...paging, where, wheregroup}})}} className='page-link'>처음</button></li>
                  <li className='page-item'><button onClick={()=>{let wheregroup=priorgroup;let where=startpage;this.setState({paging: {...paging, wheregroup, where}})}} className='page-link'>이전</button></li>
                </ul> : 
                <ul className="pagination justify-content-center">
                  <li className='page-item disabled'><button className='page-link'>처음</button></li>
                  <li className='page-item disabled'><button className='page-link'>이전</button></li>
                </ul>
              }
              {pageLoop.map(where=>{
                if (where === paging.where) {
                  return <li key={`li${where}`} className='page-item active'><button key={`btn${where}`} className='page-link'>{where}</button></li>
                } else {
                  return <li key={`li${where}`} className='page-item'><button onClick={()=>{let wheregroup=Number.parseInt((where-1)/this.state.paging.maxpages)+1;this.setState({paging: {...paging, where, wheregroup}})}} key={`btn${where}`} className='page-link'>{where}</button></li>
                }
              })}
              {paging.wheregroup < totalgroup ?
                <ul className="pagination justify-content-center">
                  <li className='page-item'><button onClick={()=>{let wheregroup=nextgroup; let where=startpage;this.setState({paging: {...paging, where, wheregroup}})}} className='page-link'>다음</button></li>
                  <li className='page-item'><button onClick={()=>{let wheregroup=totalgroup; let where=startpage;this.setState({paging: {...paging, where, wheregroup}})}} className='page-link'>마지막</button></li>
                </ul> : 
                <ul className="pagination justify-content-center">
                  <li className='page-item disabled'><button className='page-link'>다음</button></li>
                  <li className='page-item disabled'><button className='page-link'>마지막</button></li>
                </ul>
              }
            </ul>
          </nav>
          <div>
              {
                tableLoop.map(e => {
                  return (
                    <div key={e}>
                      <div className="card">
                        <div className="card-header">
                          <Link
                          to = {!this.state.isProfile ? {
                              pathname: '/Profile',
                              state: rows[e].userid,
                          } : {
                              pathname: '/PostShow',
                              state: {postid: rows[e].postid},
                          }}>{rows[e].username}</Link>
                          {/* // <% if(isLogin) { %>
                          // <% if(rs.getString("userid").equals(session.getAttribute("uid")) || session.getAttribute("isAdmin") != null) { %>
                          //   <div className="float-right">
                          //     <a className="btn btn-danger" href="delete.jsp?tableName=comment&id=<%= rs.getInt(1) %>">����</a> 
                          //     <a className="btn btn-warning" href="update.jsp?tableName=comment&id=<%= rs.getInt(1) %>">����</a> 
                          //   </div>
                          // <% } %>
                          // <% } %> */}
                        </div>
                        <div className="card-body">
                          <blockquote className="blockquote mb-0">
                            <p>{rows[e].cmt}</p>
                            <footer className="blockquote-footer">
                              <cite title="Source Title">{rows[e].writedate.replace('T', ' ').substring(0, 19)}</cite>
                            </footer>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {paging.wheregroup > 1 ?
                <ul className="pagination justify-content-center">
                  <li className='page-item'><button onClick={()=>{let where=1;let wheregroup=Number.parseInt((where-1)/this.state.paging.maxpages)+1;this.setState({paging: {...paging, where, wheregroup}})}} className='page-link'>처음</button></li>
                  <li className='page-item'><button onClick={()=>{let wheregroup=priorgroup;let where=startpage;this.setState({paging: {...paging, wheregroup, where}})}} className='page-link'>이전</button></li>
                </ul> : 
                <ul className="pagination justify-content-center">
                  <li className='page-item disabled'><button className='page-link'>처음</button></li>
                  <li className='page-item disabled'><button className='page-link'>이전</button></li>
                </ul>
              }
              {pageLoop.map(where=>{
                if (where === paging.where) {
                  return <li key={`li${where}`} className='page-item active'><button key={`btn${where}`} className='page-link'>{where}</button></li>
                } else {
                  return <li key={`li${where}`} className='page-item'><button onClick={()=>{let wheregroup=Number.parseInt((where-1)/this.state.paging.maxpages)+1;this.setState({paging: {...paging, where, wheregroup}})}} key={`btn${where}`} className='page-link'>{where}</button></li>
                }
              })}
              {paging.wheregroup < totalgroup ?
                <ul className="pagination justify-content-center">
                  <li className='page-item'><button onClick={()=>{let wheregroup=nextgroup; let where=startpage;this.setState({paging: {...paging, where, wheregroup}})}} className='page-link'>다음</button></li>
                  <li className='page-item'><button onClick={()=>{let wheregroup=totalgroup; let where=startpage;this.setState({paging: {...paging, where, wheregroup}})}} className='page-link'>마지막</button></li>
                </ul> : 
                <ul className="pagination justify-content-center">
                  <li className='page-item disabled'><button className='page-link'>다음</button></li>
                  <li className='page-item disabled'><button className='page-link'>마지막</button></li>
                </ul>
              }
            </ul>
          </nav>
          {/* </div> */}
        </div>
      );
    } else {
      return(
        <div><h3>댓글이 없습니다.</h3></div>
      );
    }
  }
}

export default CmtList;
