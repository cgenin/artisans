import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import  CardText from 'material-ui/Card/CardText';
import  CardActions  from 'material-ui/Card/CardActions';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

import SearchLayout from '../SearchLayout';
import HelpModal from '../../../help-modal/HelpModal';
import search from '../rechercher.md';

const mapStateToProps = (state) => {
  const {rechercher, adress, geolocation} = state;
  return {rechercher, adress, geolocation};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class Recapitulatif extends Component {

  render() {
    return (
      <SearchLayout title="Récapitulatif">
        <CardText>
        <h1>TEST 2</h1>
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
