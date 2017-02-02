import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {search} = state.rechercher;
  return {search};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (search) => {
      return dispatch();
    }
  }
};

class List extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>Test</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
