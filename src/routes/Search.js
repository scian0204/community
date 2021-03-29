import React from 'react';

class Search extends React.Component {
    componentDidMount() {
        const { location, history } = this.props;
        
        if (location.state === undefined) {
            history.push('/');
        }

        // console.log(location.state);
    }

    render() {
        const { location } = this.props;
        if (location.state) {
            return (
                <div>
                    <h1>{location.state}</h1>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Search;
