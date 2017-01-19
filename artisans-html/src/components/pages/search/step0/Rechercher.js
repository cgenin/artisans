import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import HelpModal from '../../../help-modal/HelpModal'
import search from './rechercher.md';
import rechercherImg from './rechercher-bubble.svg';


export default class Rechercher extends Component {
    static propTypes = {

    };



    render() {
        return (
            <div className="speech-bubble-container">
                <Card initiallyExpanded={true} style={{width: 328}}>
                    <CardHeader title="Rechercher"/>
                    <CardMedia>
                        <img alt="Que recherchez vous ?" src={rechercherImg} width={264} height={272}/>
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

        );
    }
}