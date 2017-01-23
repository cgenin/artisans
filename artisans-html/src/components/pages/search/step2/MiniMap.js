import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class MiniMap extends Component {

  static propTypes = {
    googleApi: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  };

  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const src = `https://maps.googleapis.com/maps/api/staticmap?key=${this.props.googleApi}
    &center=${this.props.lat},${this.props.lon}
    &zoom=18&scale=false&size=326x245&maptype=roadmap&format=png&&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${this.props.lat},${this.props.lon}&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${this.props.lat},${this.props.lon}`;

    return (
      <img alt="Carte du lieux"
        width="326"
        height="245"
        frameBorder="0" style={{border: 0}} src={src} allowFullScreen/>
    );
  }
}
