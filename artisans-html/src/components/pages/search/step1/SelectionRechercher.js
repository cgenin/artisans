import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Card  from 'material-ui/Card/Card';
import  CardActions  from 'material-ui/Card/CardActions';
import  CardHeader  from 'material-ui/Card/CardHeader';
import  CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import List  from 'material-ui/List/List';
import  ListItem from 'material-ui/List/ListItem';
import  Divider from 'material-ui/Divider/Divider';
import ContentSend from 'material-ui/svg-icons/content/send';

import HelpModal from '../../../help-modal/HelpModal'
import rechercher from '../rechercher.md';
import Routes from '../../../../Routes';
import ThemeApp from '../../../ThemeApp';
import {step0, step1, step2} from '../../../../redux/rechercher/actions';


const mapStateToProps = (state, ownProps) => {
  const {search, artisans, match, length} = state.rechercher;

  return {search, artisans, match, length};
};

const mapDispatchToProps = (dispatch) => {
  return {
    back: () => dispatch(step0()),
    step1: (search) => {
      return dispatch(step1(search))
    },
    onValidate: (artisanType) => {
      return dispatch(step2(artisanType));
    }
  }
};

class SelectionRechercher extends Component {
  static propTypes = {
    search: PropTypes.string,
    artisans: PropTypes.array.isRequired,
    match: PropTypes.array.isRequired,
    length: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    this.state={other:false};
  }


  componentDidMount() {
    const search = this.context.router.params.search;
    this.props.step1(search);
  }

  onBack(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.props.back().then(
      () => this.context.router.push(Routes.search.step0.fullpath)
    );
  }

  onValidate(artisan) {
    return (evt) => {
      if (evt) {
        evt.preventDefault();
      }
      this.props.onValidate(artisan.key)
        .then(
          () => this.context.router.push(Routes.search.step2.fullpath(artisan.sub))
        );
    }
  }

  render() {
    const title = `Recherche de : '${this.props.search}'`;
    const res = this.props.match.map((a, i) =>
      <ListItem key={i} primaryText={ `Mot clé : ${a.label}` } leftIcon={
        <ContentSend  style={{color:ThemeApp.selectionrechercher.color}} />}
                style={ThemeApp.selectionrechercher}  onTouchTap={this.onValidate(a)} secondaryText={a.name}/>
    );
    const arts = this.props.artisans.map((a, i) =>
      <ListItem key={i} primaryText={ `Mot clé : ${a.label}` } leftIcon={<ContentSend />}
                onTouchTap={this.onValidate(a)} secondaryText={a.name}/>
    );
    return (
      <div className="speech-bubble-container">
        <Card initiallyExpanded={true} style={{width: 328}}>
          <CardHeader title={title} subtitle={`${this.props.length} résultat(s)`}/>
          <CardText className="selection-rechercher-container">
            {res}
            <Divider/>
            <List>
              {arts}
            </List>
          </CardText>
          <CardActions className="rechercher-card-actions">
            <HelpModal text={rechercher}/>
            <RaisedButton label="Précédent" onClick={this.onBack}/>
          </CardActions>
        </Card>
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionRechercher);