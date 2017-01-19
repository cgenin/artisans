import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import withWidth from 'material-ui/utils/withWidth';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {Step, Stepper, StepLabel} from 'material-ui/Stepper';

import HelpModal from '../../help-modal/HelpModal'
import './search.css';
import search from './search.md';
import rechercherImg from './rechercher-bubble.svg';


class Search extends Component {

  render() {
    return (
      <div>
        <Title render={(previousTitle) => `Rechercher - Artisans`}/>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={0}>
            <Step>
              <StepLabel>Mon type d'artisans</StepLabel>
            </Step>
            <Step>
              <StepLabel>Sélection</StepLabel>
            </Step>
            <Step>
              <StepLabel>Le lieux</StepLabel>
            </Step>
            <Step>
              <StepLabel>Sélection</StepLabel>
            </Step>
          </Stepper>
        </div>
        <div className="speech-bubble-container">
          <Card initiallyExpanded={true} style={{width: 328}}>
            <CardHeader title="Rechercher"/>
            <CardMedia>
              <img src={rechercherImg} width={264} height={272}/>
            </CardMedia>
            <CardText>
              <TextField floatingLabelFixed={true} floatingLabelText="Taper votre recherche ici"
                         hintText="Ex: vitreur, peinture, etc ..." fullWidth={true}/>
            </CardText>
            <CardActions className="rechercher-card-actions">
              <HelpModal text={search}/>
              <RaisedButton primary={true} label="Suivant"/>
            </CardActions>
          </Card>
        </div>

      </div>
    );
  }
}

export default withWidth()(Search);
