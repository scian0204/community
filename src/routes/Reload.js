import React from 'react';

class Reload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: null,
      }
      const { location, history } = this.props;
      
      if (location.state === undefined) {
        history.push('/');
      } else {
        this.state.value = location.state;
        history.push({
            pathname: `/${this.state.value.route}`,
            state: this.state.value.value
        });
      }

      
    }
    render() {
        return null;
    }
}

export default Reload;
