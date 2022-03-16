import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class BoardList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          rows: [],
      };
      axios.post('http://cianas.kro.kr:8081/api/boardList')
            .then(data=>this.setState({rows:data.data.result.rows}));
    //   console.log(this.state.rows);
    }

    setBid(boardid) {
        this.props.setBid(boardid);
    }

    render() {
        let {rows} = this.state;
        return (
            <div>
                <div style={{border: '1px solid blue', padding: '10px'}}>
                    <div className="list-group">
                        <Link to = {{ pathname: '/BoardShow' }}>
                            <button className="list-group-item list-group-item-action">게시판 전체 보기</button>
                        </Link>
                        {false ? 
                            <Link to = {{ pathname: '/form' }}>
                                <button className="list-group-item list-group-item-action">게시판 요청하기</button>
                            </Link> : 
                            <button onClick={()=>alert("로그인 후 이용 가능합니다.")} className="list-group-item list-group-item-action">게시판 요청하기</button>
                        }
                    </div>
                <hr />
                    <div className="list-group">
                        {rows.map(e=>{
                            return (
                                <button onClick={()=>this.setBid(e.boardid)} key={e.boardid} className="list-group-item list-group-item-action">{e.boardname}</button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardList;
