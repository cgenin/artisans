import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';


import HelpModal from '../../../help-modal/HelpModal'
import search from '../rechercher.md';
import rechercherImg from './ousuisje-bubble.svg';
import Routes from '../../../../Routes';
import {step3, step2} from '../../../../redux/rechercher/actions';
import './OuSuisJe.css'
import ThemeApp from '../../../ThemeApp'
import Geolocation from './Geolocation'

const mapStateToProps = (state) => {
  const {artisans, search} = state.rechercher;
  return {artisans, search};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (artisans) => {
      return dispatch(step3(artisans));
    },
    onBack: (artisans) => {
      return dispatch(step2(artisans));
    }
  }
};

class Rechercher extends Component {
  static propTypes = {
    search: PropTypes.string
  };
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.onBack = this.onBack.bind(this);
  }

  componentDidMount() {
    const search = this.props.search || '';
    this.setState({search})
  }

  onBack(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.props.onBack().then(
      () => this.context.router.push(Routes.search.step1.fullpath(this.props.search))
    );
  }


  render() {
    return (
      <div className="speech-bubble-container">
        <Card initiallyExpanded={true} style={{width: 328}}>
          <CardHeader title="Se Situer"/>
          <CardMedia>
            <img alt="Ou suis je ?" src={rechercherImg} width={264} height={272}/>
          </CardMedia>
          <CardText>
            <Tabs >
              <Tab style={{backgroundColor:ThemeApp.drawer.header.color}}  label="GPS">
                <div className="tab-signature">
                  <Geolocation/>
                </div>
              </Tab>
              <Tab style={{backgroundColor:ThemeApp.drawer.header.color}} label="Adresse">
                <div className="tab-signature">

                </div>
              </Tab>
            </Tabs>
          </CardText>
          <CardActions className="rechercher-card-actions">
            <HelpModal text={search}/>
            <RaisedButton label="Précédent" onClick={this.onBack}/>
          </CardActions>
        </Card>
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rechercher);
