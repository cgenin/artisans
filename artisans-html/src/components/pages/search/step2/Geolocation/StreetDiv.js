import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import {reverse} from '../../../../../redux/geolocation/actions';

const mapStateToProps = (state) => {
  const {geolocation} = state;
  if(geolocation.results.street){
    return {label:geolocation.results.street.label};
  }
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (lat, lon) => {
      return dispatch(reverse(lat, lon));
    },

  }
};

class StreetDiv extends Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    onLoad: PropTypes.func.isRequired,
    label: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.props.onLoad(this.props.lat, this.props.lon);
  }

  render() {
    if (!this.props.label) {
      return (<div></div>);
    }

    return (
      <div className="geolocalisation-results-button-panel">
        <strong>Adresse : {this.props.label}</strong>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreetDiv);