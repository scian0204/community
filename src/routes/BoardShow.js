import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BoardShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        like: null,
      },
      rows: [],
      paging: {
        where: 1,
        wheregroup: 1,
        maxpages: 10,
        maxrows: 10,
      },
      isSearch: false,
    }
    if (props.like) {
      this.state.queryData.like = props.like;
      this.state.isSearch = true;
    }
    axios.post('http://localhost:8080/api/boardShow', this.state.queryData)
      .then(data => this.setState({ rows: data.data.result.rows }));
  }

  render() {
    let { rows } = this.state;

    if (rows) {
      const { paging } = this.state;
      let nextgroup = paging.wheregroup + 1;
      let priorgroup = paging.wheregroup - 1;
      let startpage = (paging.wheregroup - 1) * this.state.paging.maxpages + 1;
      let endpage = startpage + this.state.paging.maxpages - 1;
      let totalrows = rows.length;
      let totalpages = Number.parseInt((totalrows - 1) / paging.maxrows) + 1;
      let startrow = (paging.where - 1) * paging.maxrows;
      let endrow = startrow + paging.maxrows - 1;
      if (endrow >= totalrows) endrow = totalrows - 1;
      let totalgroup = Number.parseInt((totalpages - 1) / this.state.paging.maxpages) + 1;
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
          <div id="bdr" style={{ "border": "1px solid blue", "padding": "10px" }}>
            <div id="btns">
              {this.state.isSearch ? null : false ?
                <Link to={{ pathname: '/form' }}>
                  <button className="btn btn-primary">게시판 요청</button>
                </Link> :
                <button onClick={() => alert("로그인 후 이용 가능합니다.")} className="btn btn-primary">게시판 요청</button>
              }
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">이름</th>
                  <th scope="col">만든 유저</th>
                  <th scope="col">등록일</th>
                </tr>
              </thead>
              <tbody>
                {
                  tableLoop.map(e => {
                    return (
                      <tr onClick={() => {
                        this.props.history.push({
                          pathname: "/",
                          state: { boardid: rows[e].boardid }
                        })
                      }} key={`1${e}`}>
                        <td key={`2${e}`}>{rows[e].boardid}</td>
                        <td key={`3${e}`}>{rows[e].boardname}</td>
                        <td key={`4${e}`}>{rows[e].username}</td>
                        <td key={`5${e}`}>{rows[e].regdate.substring(0, 10)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                {paging.wheregroup > 1 ?
                  <ul className="pagination justify-content-center">
                    <li className='page-item'><button onClick={() => { let where = 1; let wheregroup = 1; this.setState({ paging: { ...paging, where, wheregroup } }) }} className='page-link'>처음</button></li>
                    <li className='page-item'><button onClick={() => { let wheregroup = priorgroup; let where = (priorgroup - 1) * this.state.paging.maxpages + 1; this.setState({ paging: { ...paging, wheregroup, where } }) }} className='page-link'>이전</button></li>
                  </ul> :
                  <ul className="pagination justify-content-center">
                    <li className='page-item disabled'><button className='page-link'>처음</button></li>
                    <li className='page-item disabled'><button className='page-link'>이전</button></li>
                  </ul>
                }
                {pageLoop.map(where => {
                  if (where === paging.where) {
                    return <li key={`li${where}`} className='page-item active'><button key={`btn${where}`} className='page-link'>{where}</button></li>
                  } else {
                    return <li key={`li${where}`} className='page-item'><button onClick={() => { let wheregroup = Number.parseInt((where - 1) / this.state.paging.maxpages) + 1; this.setState({ paging: { ...paging, where, wheregroup } }) }} key={`btn${where}`} className='page-link'>{where}</button></li>
                  }
                })}
                {paging.wheregroup < totalgroup ?
                  <ul className="pagination justify-content-center">
                    <li className='page-item'><button onClick={() => { let wheregroup = nextgroup; let where = (nextgroup - 1) * this.state.paging.maxpages + 1; this.setState({ paging: { ...paging, where, wheregroup } }) }} className='page-link'>다음</button></li>
                    <li className='page-item'><button onClick={() => { let wheregroup = totalgroup; let where = (totalgroup - 1) * this.state.paging.maxpages + 1; this.setState({ paging: { ...paging, where, wheregroup } }) }} className='page-link'>마지막</button></li>
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
    } else {
      return (
        <div>
          <div id="bdr" style={{ "border": "1px solid blue", "padding": "10px" }}>
            <h4>글이 없습니다.</h4>
          </div>
        </div>
      );
    }
  }
}

export default BoardShow;
