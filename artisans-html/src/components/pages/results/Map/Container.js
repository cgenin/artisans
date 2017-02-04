import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper/Paper';
import GoogleApiComponent from 'google-maps-react/dist/GoogleApiComponent';
import {Map, Marker, InfoWindow} from 'google-maps-react';
import keys from '../../../../keys.json';

import InfoWindowContainer from './InfoWindowContainer';


class Container extends Component {

  static propTypes = {
    artisans: PropTypes.object,
    google: PropTypes.object,
  };


  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }


  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }


  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }


  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const mainIcon = {
      url: "http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=home|0d47a1",
      anchor: new this.props.google.maps.Point(0, 0),
      scaledSize: new this.props.google.maps.Size(21, 34)
    };

    const artisanIcon = {
      url: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=star%7CFF0000%7C000000",
      anchor: new this.props.google.maps.Point(0, 0),
      scaledSize: new this.props.google.maps.Size(21, 34)
    };

    const arts = this.props.artisans.results
      .filter(a => a.coords && a.coords.lat && a.coords.lon)
      .map(a => <Marker key={a.redis} position={{lat: a.coords.lat, lng: a.coords.lon}} onClick={this.onMarkerClick}
                        artisan={a} icon={artisanIcon}/>);
    const {lat, lon} = this.props.artisans.reference;
    const center = {lat, lng: lon};
    return (
      <Paper id="google-map-container">
        <Map google={this.props.google} onClick={this.onMapClicked}
             containerStyle={{width: '60vw', height: '60vh', margin: 'auto', display: 'block'}}
             initialCenter={center} center={center} className={'map'} zoom={10}>
          <Marker name="Votre adresse" artisan={{isRef: true}} onClick={this.onMarkerClick} position={center}
                  icon={mainIcon}/>
          {arts}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}>
            <InfoWindowContainer selectedPlace={this.state.selectedPlace.artisan}  />
          </InfoWindow>
        </Map>
      </Paper>
    );
  }
}

export default GoogleApiComponent({
  apiKey: keys.googleApi
})(Container)