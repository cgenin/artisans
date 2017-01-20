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
      return (
        <Paper>
          <strong>{geol.results.lat} / {geol.results.lon}</strong>
        </Paper>
      );
    case geol.CST_ERROR:
      return (
        <Paper>
          <h3>Erreur :</h3>
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