import React, {Component, PropTypes} from 'react';
import  CardActions  from 'material-ui/Card/CardActions';
import  CardMedia from 'material-ui/Card/CardMedia';
import  CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import Tabs  from 'material-ui/Tabs/Tabs';
import   Tab from 'material-ui/Tabs/Tab';
import {connect} from 'react-redux';


import SearchLayout from '../SearchLayout';
import HelpModal from '../../../help-modal/HelpModal';
import search from './rechercher-step3.md';
import rechercherImg from './ousuisje-bubble.svg';
import Routes from '../../../../Routes';
import {step3, step2} from '../../../../redux/rechercher/actions';
import './OuSuisJe.css';
import ThemeApp from '../../../ThemeApp';
import Geolocation from './Geolocation/index';
import Adresse from './Adresse';

const mapStateToProps = (state) => {
  const { selected, search} = state.rechercher;
  return { akey:selected.key, search};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (key) => {
      return dispatch(step3(key));
    },
    onBack: (search) => {
      return dispatch(step2(search));
    }
  }
};

class Rechercher extends Component {
  static propTypes = {
    key: PropTypes.string,
    search: PropTypes.string,
  };
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    this.onGoStep3 = this.onGoStep3.bind(this);
  }



  onBack(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const search = this.props.search;
    this.props.onBack(search).then(
      () => this.context.router.push(Routes.search.step1.fullpath(search))
    );
  }

  onGoStep3(lat, lon) {
    const key = this.props.akey;
    this.props.onValidate(key).then(
      () => this.context.router.push(Routes.search.step3.fullpath(key, lat, lon))
    );
  }


  render() {
    return (
      <SearchLayout  title="Se Situer">
          <CardMedia>
            <img alt="Ou suis je ?" src={rechercherImg} width={264} height={272}/>
          </CardMedia>
          <CardText>
            <Tabs >
              <Tab style={{backgroundColor: ThemeApp.drawer.header.color}} label="GPS">
                <div className="tab-signature">
                  <Geolocation onSelect={this.onGoStep3}/>
                </div>
              </Tab>
              <Tab style={{backgroundColor: ThemeApp.drawer.header.color}} label="Adresse">
                <div className="tab-signature">
                  <Adresse onSelect={this.onGoStep3}/>
                </div>
              </Tab>
            </Tabs>
          </CardText>
          <CardActions className="rechercher-card-actions">
            <HelpModal text={search}/>
            <RaisedButton label="Précédent" onClick={this.onBack}/>
          </CardActions>
        </SearchLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rechercher);
