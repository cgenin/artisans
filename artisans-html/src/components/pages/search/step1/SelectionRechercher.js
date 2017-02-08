import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider/Divider';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import SearchLayout from '../SearchLayout';
import HelpModal from '../../../help-modal/HelpModal';
import rechercher from './rechercher-step1.md';
import Routes from '../../../../Routes';
import {step0, step1, step2} from '../../../../redux/rechercher/actions';


const mapStateToProps = (state, ownProps) => {
  const {search, artisans, match, length, awaiting} = state.rechercher;

  return {search, artisans, match, length, awaiting};
};

const mapDispatchToProps = (dispatch) => {
  return {
    back: () => dispatch(step0()),
    step1: (search) => {
      return dispatch(step1(search))
    },
    onValidate: (artisan) => {
      return dispatch(step2(artisan));
    }
  }
};

class SelectionRechercher extends Component {
  static propTypes = {
    search: PropTypes.string,
    artisans: PropTypes.array.isRequired,
    match: PropTypes.array.isRequired,
    length: PropTypes.number.isRequired,
    await: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    this.onMore = this.onMore.bind(this);
    this.state = {other: false};
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

  onMore() {
    const other = !this.state.other;
    this.setState({other});
  }


  onValidate(artisan) {
    return (evt) => {
      if (evt) {
        evt.preventDefault();
      }
      this.props.onValidate(artisan)
        .then(
          () => this.context.router.push(Routes.search.step2.fullpath(artisan.key))
        );
    }
  }

  render() {

    if(this.props.awaiting){
      return (
        <div className="rechercher-card-awaiting">
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }

    const title = `Recherche de : '${this.props.search}'`;
    const res = this.props.match.map((a, i) =>
      <ListItem key={i} primaryText={ `Mot clé : ${a.label}` } leftIcon={  <ContentSend  />}
                onTouchTap={this.onValidate(a)} secondaryText={a.name}/>
    );

    const all = (this.state.other) ?
      (
        <div style={{width: '100%', marginTop: '5px'}}>
          <FlatButton style={{margin: 'auto'}} icon={<ContentRemove/>} label="Masquer"
                      secondary={true} onClick={this.onMore}/>
          <List>
            {this.props.artisans.map((a, i) =>
              <ListItem key={i} primaryText={ `Mot clé : ${a.label}` } leftIcon={<ContentSend />}
                        onTouchTap={this.onValidate(a)} secondaryText={a.name}/>
            )}
          </List>
          <FlatButton style={{margin: 'auto'}} icon={<ContentRemove/>} label="Masquer"
                      secondary={true} onClick={this.onMore}/>
        </div>
      ) :
      (<div style={{width: '100%', marginTop: '5px'}}>
        <FlatButton style={{margin: 'auto'}} icon={<NavigationMoreHoriz/>} label="Plus de résultats"
                    secondary={true} onClick={this.onMore}/>
      </div>);
    return (
      <SearchLayout title={title} subtitle={`${this.props.length} résultat(s)`}>
        <CardText className="selection-rechercher-container">
          <List>{res}</List>
          <Divider/>
          {all}
        </CardText>
        <CardActions className="rechercher-card-actions">
          <HelpModal text={rechercher}/>
          <RaisedButton label="Précédent" onClick={this.onBack}/>
        </CardActions>
      </SearchLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionRechercher);