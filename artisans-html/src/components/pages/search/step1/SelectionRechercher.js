import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';

import HelpModal from '../../../help-modal/HelpModal'
import rechercher from '../rechercher.md';
import Routes from '../../../../Routes';
import {step0, step1, step2} from '../../../../redux/rechercher/actions';

const mapStateToProps = (state) => {
  const {search, artisans} = state.rechercher;
  return {search, artisans};
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
    artisans: PropTypes.array,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
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
      this.props.onValidate(artisan.sub)
        .then(
          () => this.context.router.push(Routes.search.step2.fullpath(artisan.sub))
        );
    }
  }

  render() {
    const title = `Recherche de : '${this.props.search}'`;
    const arts = this.props.artisans.map((a, i) =>
      <ListItem key={i} primaryText={a.label} leftIcon={<ContentSend />}
                onTouchTap={this.onValidate(a)} secondaryText={a.group}/>
    );
    return (
      <div className="speech-bubble-container">
        <Card initiallyExpanded={true} style={{width: 328}}>
          <CardHeader title={title}/>
          <CardText>
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