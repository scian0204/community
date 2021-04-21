import React from 'react';
// import { post } from 'axios';
import {Link} from 'react-router-dom';
// import Search from '../routes/Search';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.value === "") {
      this.setState({value: null})
    } else {
      this.setState({value: event.target.value});
    }
  }

  render() {
    return (
      <div>
        <form>
            <div className="input-group mb-3">
                <input type="text" className="form-control" aria-describedby="button-addon2" onChange={this.handleChange} required />
                <div className="input-group-append">
                    <Link
                        to = {{
                            pathname: '/Reload',
                            state: {value: {word: this.state.value}, route: "Search"},
                        }}
                        replace={true}
                    >
                        <input onClick={(e)=>e.target.parentElement.parentElement.previousSibling.value=""} className="btn btn-outline-secondary" type="submit" id="button-addon2" value="search" />
                    </Link>
                </div>
            </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
