import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import {connect} from 'react-redux';

import {launch, back} from '../../../../redux/adress/actions'
import FormAdress from './FormAdress'
import MiniMap from './MiniMap'

const mapStateToProps = (state) => {
  const {adress} = state;
  return {adress};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLaunch: (position) => {
      return dispatch(launch(position));
    },
    onBack: (position) => {
      return dispatch(back(position));
    },
  }
};

const convert = (adress, onLaunch, onBack) => {
  switch (adress.step) {
    case adress.CST_START:
      return (
        <CircularProgress size={80} thickness={5}/>
      );
    case adress.CST_RESULTS:
      const {results} = adress;
      return (
        <div>
          <h2>Résultats</h2>
          <MiniMap googleApi={adress.key.googleApi} lat={results.lat} lon={results.lon}/>
          <ul>
            <li><strong>latitude : </strong>{results.lat}</li>
            <li><strong>longitude : </strong>{results.lon}</li>
            <li><strong>Adresse complète : </strong>{results.street.label}</li>
          </ul>
          <div className="geolocalisation-results-button-panel">
            <FlatButton icon={<NavigationArrowBack />} onTouchTap={onBack}/>
            <RaisedButton label="Choisir" primary={true}/>
          </div>
        </div>
      );
    case adress.CST_ERROR:
      return (
        <div></div>
      );
    default:
      return <FormAdress adress={adress} onLaunch={onLaunch}/>
  }
};

class Adresse extends Component {
  static propTypes = {
    adress: PropTypes.object.isRequired,
    onLaunch: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  render() {
    const component = convert(this.props.adress, this.props.onLaunch, this.props.onBack);
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Adresse);