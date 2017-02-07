import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper/Paper';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import MapsMap from 'material-ui/svg-icons/maps/map';


export default class Coords extends Component {
  static propTypes = {
    lat: PropTypes.string,
    lon: PropTypes.string,
    label: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  render() {

    if(!this.props.lat || !this.props.lon){
      return <div></div>;
    }

    return (
      <Paper className="inner-block">
        <div>
          <strong>Latitude</strong> : {this.props.lat}
        </div>
        <div>
          <strong>Longitude</strong> : {this.props.lon}
        </div>
        <div>
          <strong>Adresse Géolocalisée</strong> : {this.props.label}
        </div>
        <div>
          <FlatButton icon={<MapsMap/>} secondary={true} label="Ouvrir dans Google map"/>
        </div>
      </Paper>
    );
  }
}
