import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class InfoWindowContainer extends Component {

  static propTypes = {
    selectedPlace: PropTypes.object,
  };


  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

  }


  render() {
    if (!this.props.selectedPlace) {
      return <div></div>
    }

    if (this.props.selectedPlace.isRef) {
      return <h3>Votre Adresse</h3>;
    }
    return (

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h4>{this.props.selectedPlace.name}</h4>
        <strong>...</strong>
        <div className="info-button-container">
          <a className="button green" href=""><span className="text-detail-button">&nbsp;+&nbsp;détail</span></a>
        </div>
      </div>

    );
  }
}
