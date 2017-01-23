import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Paper from 'material-ui/Paper/Paper';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';


import {launch} from '../../../../redux/geolocation/actions'
import MiniMap from './MiniMap';

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
          <MiniMap googleApi={geol.key.googleApi} lat={geol.results.lat} lon={geol.results.lon}/>
          <div className="geolocalisation-results-button-panel">
            <strong>latitude : {geol.results.lat} / longitude : {geol.results.lon}</strong>
          </div>
          <div className="geolocalisation-results-button-panel">
            <FlatButton icon={<NavigationRefresh/>} onClick={onLaunch}/>
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
  static propTypes = {
    geolocation: PropTypes.object.isRequired,
    onLaunch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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