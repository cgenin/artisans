import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';


import {mapStateToProps, mapDispatchToProps, callConponentDidMount, goToList} from '../../../../services/results';
import './map.css'
import Container from './Container'

class Map extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.onBack = this.onBack.bind(this);
    // this.onGoToMap = this.onGoToMap.bind(this);
  }

  onBack() {
    goToList(this);
  }

  componentDidMount() {
    callConponentDidMount(this);
  }

  render() {

    const buttonBack = (
      <div className="map-buttons-container">
        <RaisedButton data-tooltip="Revenir à la liste" icon={<NavigationArrowBack/>} fullWidth={true} label="Précédent" onClick={() => this.onBack()}/>
      </div>
    );

    return (
      <div id="map-react" style={{width: '100%'}}>
        <div style={{textAlign: 'center'}}>
          <h1>Carte des artisans</h1>
        </div>
        {buttonBack}
        <Container artisans={this.props.artisans}/>
        {buttonBack}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
