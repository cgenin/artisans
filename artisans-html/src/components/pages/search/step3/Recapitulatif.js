import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import  CardText from 'material-ui/Card/CardText';
import  CardActions  from 'material-ui/Card/CardActions';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import Divider from 'material-ui/Divider/Divider';
import ActionSearch from 'material-ui/svg-icons/action/search';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import ActionDone from 'material-ui/svg-icons/action/done';

import SearchLayout from '../SearchLayout';
import HelpModal from '../../../help-modal/HelpModal';
import Routes from '../../../../Routes';
import search from '../rechercher.md';
import {step2} from '../../../../redux/rechercher/actions';

const mapStateToProps = (state) => {
  const {rechercher, adress, geolocation} = state;
  return {rechercher, adress, geolocation};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBack: (key) => {
      return dispatch(step2(key));
    }
  };
};

const type = (lat, lon, adress) => {
  if (lat === ''+adress.results.lat && lon === ''+adress.results.lon) {
    return {
      type: 'Adresse',
      lat, lon,
      street: adress.results.street.label
    };
  }
  return {
    type: 'GPS',
    lat, lon,
    street: 'Votre position'
  };

};

class Recapitulatif extends Component {

  static propTypes = {
    geolocation: PropTypes.object.isRequired,
    rechercher: PropTypes.object.isRequired,
    adress: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    // this.onGoStep3 = this.onGoStep3.bind(this);
  }

  onBack(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const key = this.props.rechercher.selected.key;
    this.props.onBack(this.props.rechercher.selected).then(
      () => this.context.router.push(Routes.search.step2.fullpath(key))
    );
  }

  render() {
    const lat = this.context.router.params.lat;
    const lon = this.context.router.params.lon;
    const datas = type(lat, lon, this.props.adress, this.props.geolocation);

    return (
      <SearchLayout title="Récapitulatif">
        <CardText>
          <div className="recap-results-container">
            <div className="recap-results-item center">
              <ActionSearch style={{width: '1.5em', height: '1.5em'}}/> <h2> Mon type d'artisan</h2>
            </div>
            <div className="recap-results-item">
              Recherche : &nbsp;<strong>{this.props.rechercher.search}</strong>
            </div>
            <div className="recap-results-item">
              Sélectionné :&nbsp;<strong>{this.props.rechercher.selected.name}</strong>
            </div>
            <Divider />
            <div className="recap-results-item center margin-top">
              <MapsPlace style={{width: '1.5em', height: '1.5em'}}/> <h2> Le lieux</h2>
            </div>
            <div className="recap-results-item">
              Type :&nbsp;<strong>{datas.type}</strong>
            </div>
            <div className="recap-results-item">
              Latitude :&nbsp;<strong>{datas.lat}</strong>
            </div>
            <div className="recap-results-item">
              Longitude :&nbsp;<strong>{datas.lon}</strong>
            </div>
            <div className="recap-results-item">
              Adresse :&nbsp;<strong>{datas.street}</strong>
            </div>
            <Divider style={{marginBottom:'10px'}} />
            <RaisedButton icon={<ActionDone />} fullWidth={true} primary={true} label="Valider" />
          </div>
        </CardText>
        <CardActions className="rechercher-card-actions">
          <HelpModal text={search}/>
          <RaisedButton label="Précédent" onClick={this.onBack}/>
        </CardActions>
      </SearchLayout>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Recapitulatif);
