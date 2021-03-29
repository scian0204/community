import React from 'react';
import axios from 'axios';

class BoardList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          rows: [],
      };
      axios.post('http://localhost:3002/api/boardList')
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
                        <button className="list-group-item list-group-item-action">게시판 전체 보기</button>
                        <button className="list-group-item list-group-item-action">게시판 요청하기</button>
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
