import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {search} = state.rechercher;
  return {
    search
  };
};

class SelectionRechercher extends Component {
  static propTypes = {
    search: PropTypes.string.isRequired
  };


  render() {
    return (
      <div className="speech-bubble-container">
        <h1>TEST - {this.props.search}</h1>
      </div>

    );
  }
}

export default connect(mapStateToProps)(SelectionRechercher);