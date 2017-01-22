import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';

import HelpModal from '../../../help-modal/HelpModal'
import search from '../rechercher.md';
import rechercherImg from './rechercher-bubble.svg';
import Routes from '../../../../Routes';
import {step1} from '../../../../redux/rechercher/actions';

const mapStateToProps = (state) => {
  const {search} = state.rechercher;
  return {search};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (search) => {
      return dispatch(step1(search));
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
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const search = this.props.search || '';
    this.setState({search})
  }

  handleChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  onSubmit(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.context.router.push(Routes.search.step1.fullpath(this.state.search))
  }


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
                       value={this.state.search} onChange={this.handleChange} hintText="Ex: vitreur, peinture, etc ..."
                       fullWidth={true}/>
          </CardText>
          <CardActions className="rechercher-card-actions">
            <HelpModal text={search}/>
            <RaisedButton primary={true} label="Suivant" onClick={this.onSubmit}
                          disabled={this.state.search.length === 0 }/>
          </CardActions>
        </Card>
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rechercher);
