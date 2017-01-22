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
    const src = `https://www.google.com/maps/embed/v1/view?key=${this.props.googleApi}&center=${this.props.lat},${this.props.lon}&zoom=18`;

    return (
      <iframe
        width="326"
        height="245"
        frameBorder="0" style={{border: 0}} src={src} allowFullScreen/>
    );
  }
}
