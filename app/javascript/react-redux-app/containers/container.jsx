import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { someAction } from '../actions';
import someComponent from '../components/some_component';


// Example of a Container
class someContainer extends Component {
  componentWillMount() {
    this.someAction();
  }

  componentDidMount() {
    this.refresher = setInterval(this.fetchMessages, 5000);
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  someAction = () => {
    this.props.someAction(this.props.someAttribute);
  }

  render () {
    return (
      <div className="container">
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    someState: state.someState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ someAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
