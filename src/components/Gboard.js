import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Gboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        postid: null,
        username: null,
        userid: null,
      },
      rows: [],
      paging: {
        where: 1,
        wheregroup: 1,
        maxpages: 10,
        maxrows: 10,
      },
      circleStyle: {
        "width": "30px",
        "height": "30px",
        "WebkitBorderRadius": "700px",
        "MozBorderRadius": "700px",
        "borderRadius": "700px",
        "backgroundColor": "gray",
      }
    };

    this.state.queryData.userid = props.userid;

    axios.post('http://cianas.kro.kr:8081/api/cmtList', this.state.queryData)
        .then(data=>this.setState({rows:data.data.result.rows}));
  }

  render() {
    let rows = this.state.rows;
    if (rows) {
      console.log(rows);
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
                          to = {{
                              pathname: '/Reload',
                              state: {value: rows[e].userid, route: 'Profile'},
                          }}><img style={this.state.circleStyle} src={`http://cianas.kro.kr:8081/api/image?fileName=${rows[e].image}`} />&nbsp;{rows[e].username}
                          </Link>
                        </div>
                        <div className="card-body">
                          <blockquote className="blockquote mb-0">
                            <p>{rows[e].guestcmt}</p>
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
        </div>
      );
    } else {
      return(
        <div><h3>방명록이 없습니다.</h3></div>
      );
    }
  }
}

export default Gboard;
