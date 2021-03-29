import React from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        boardid: null,
        order: " order by postid desc",
        qwhere: " where boardid=",
      },
      rows: [],
      paging: {
        where: 1,
        wheregroup: 1,
        maxpages: 10,
        maxrows: 10,
      }
    };
    this.state.queryData.boardid = props.boardid;
    axios.post('http://localhost:3002/api/postList', this.state.queryData)
        .then(data=>this.setState({rows:data.data.result.rows}));
  }

  componentDidUpdate() {
    if (this.props.checkFlag() === true) {
      this.state.queryData.boardid = this.props.boardid;
      axios.post('http://localhost:3002/api/postList', this.state.queryData)
      .then(data=>this.setState({rows:data.data.result.rows}));
    }
  }

  render() {
    let {rows} = this.state;
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
        <div id="bdr" style={{"border": "1px solid blue", "padding": "10px"}}>
          <div id="btns">
            <button className="btn btn-primary">일반글</button>
            <button className="btn btn-success">인기글</button>
            <div className="float-right">
			        <button className="btn btn-secondary">글쓰기</button>
		        </div>
          </div>
        {rows.length > 0 ?
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">글쓴이</th>
              <th scope="col">등록일</th>
              <th scope="col">조회수</th>
              <th scope="col">추천수</th>
            </tr>
          </thead>
          <tbody>
            {
              tableLoop.map(e => {
                // console.log(e);
                return (
                  <tr key={`1${e}`}>
                    <td key={`2${e}`}>{rows[e].postid}</td>
                    <td key={`3${e}`}>{rows[e].title}</td>
                    <td key={`4${e}`}>{rows[e].username}</td>
                    <td key={`5${e}`}>{rows[e].writedate.substring(0, 10)}</td>
                    <td key={`6${e}`}>{rows[e].viewcnt}</td>
                    <td key={`7${e}`}>{rows[e].recmd}</td>
                  </tr>
                );
              })}
          </tbody>
        </table> : <h3>글이 없습니다.</h3>
        }
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
      </div>
    );
  }
}

export default PostList;
