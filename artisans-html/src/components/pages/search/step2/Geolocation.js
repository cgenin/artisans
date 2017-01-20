import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

import {launch} from '../../../../redux/geolocation/actions'

const mapStateToProps = (state) => {
  const {geolocation} = state;
  return {geolocation};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLaunch: () => {
      return dispatch(launch());
    },
  }
};

const convert = (geol, onLaunch) => {
  switch (geol.step) {
    case geol.CST_START:
      return (
        <CircularProgress size={80} thickness={5}/>
      );
    case geol.CST_RESULTS:
      const src = `https://www.google.com/maps/embed/v1/view?key=${geol.key.googleApi}&center=${geol.results.lat},${geol.results.lon}&zoom=18`
      return (
        <Paper>
          <iframe
            width="326"
            height="245"
            frameBorder="0" style={{border: 0}} src={src} allowFullScreen/>
          <div className="geolocalisation-results-button-panel">
            <strong>latitude : {geol.results.lat} / longitude : {geol.results.lon}</strong>
          </div>
          <div className="geolocalisation-results-button-panel">
            <RaisedButton label="ré essayé" onClick={onLaunch}/>
            <RaisedButton label="Choisir" primary={true}/>
          </div>
        </Paper>
      );
    case geol.CST_ERROR:
      return (
        <Paper style={{
          padding: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Paper style={{
            height: 100,
            width: 30,
            height: 30,
            margin: 5,
            textAlign: 'center',
            display: 'inline-block',
          }} zDepth={2} circle={true}>
            <i className="fa fa-2x fa-exclamation-triangle"/>
          </Paper>
          <strong>{geol.msg}</strong>
        </Paper>
      );

    default:
      return (<RaisedButton label="Géolocalisez moi" onClick={onLaunch}
                            primary={true}/>);
  }
};

class Geolocation extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const comp = convert(this.props.geolocation, this.props.onLaunch);
    return (
      <div>
        {comp}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation)