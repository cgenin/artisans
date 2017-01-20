import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';

import HelpModal from '../../../help-modal/HelpModal'
import search from '../rechercher.md';
import rechercherImg from './ousuisje-bubble.svg';
import Routes from '../../../../Routes';
import {step3, step2} from '../../../../redux/rechercher/actions';

const mapStateToProps = (state) => {
  const {search} = state.rechercher;
  return {search};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (search) => {
      return dispatch(step3(search));
    },
    onBack: (search) => {
      return dispatch(step2(search));
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
    ) ;
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
