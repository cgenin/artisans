import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';

import {launch} from '../../../../redux/adress/actions'

const mapStateToProps = (state) => {
  const {adress} = state;
  return {adress};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLaunch: (position) => {
      return dispatch(launch(position));
    },
  }
};

const validation = (position) => {
  const codepostal = position.codepostal && /[0-9]{5}/g.test(position.codepostal);
  const commune = position.commune && position.commune.length > 2;
  const valid = codepostal && commune;
  return {valid, codepostal, commune};
};


class Form extends Component {

  static propTypes = {
    adress: PropTypes.object.isRequired,
    onLaunch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {position: {}, validator: {codepostal: true, commune: true}};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const validator = validation(this.state.position);
    this.setState({validator});
    if (!validator.valid) {
      return;
    }

    this.props.onLaunch(this.state.position);
  }

  handleChange(key) {
    return (evt) => {
      const position = Object.assign({}, this.state.position);
      position[key] = evt.target.value;
      this.setState({position});
    };
  }


  render() {
    const errorCodepostal = (this.state.validator.codepostal) ? '' : 'Le code postal est requis dans un format correct ex:86000 ';
    const errorCommune = (this.state.validator.commune) ? '' : 'La commune est requise. ';
    return (
      <div className="addresse-form-panel">
        <TextField value={this.state.position.codepostal} fullWidth={true}
                   onChange={this.handleChange('codepostal')} floatingLabelText="Code postale"
                   errorText={errorCodepostal}/>
        <TextField fullWidth={true} onChange={this.handleChange('commune')} floatingLabelText="Commune"
                   errorText={errorCommune}/>
        <TextField fullWidth={true} onChange={this.handleChange('rue')} floatingLabelText="Rue / Lieu dit"
                   multiLine={true}/>
        <RaisedButton primary={true} label="Rechercher" style={{marginTop: 10}} onTouchTap={this.handleSubmit}/>
      </div>
    );
  }
}

const convert = (adress, onLaunch) => {
  switch (adress.step) {
    case adress.CST_START:
      return (
        <CircularProgress size={80} thickness={5}/>
      );
    case adress.CST_RESULTS:
      return (
        <div>OK</div>
      );
    case adress.CST_ERROR:
      return (
        <div>KO</div>
      );
    default:
      return <Form adress={adress} onLaunch={onLaunch}/>
  }
};

class Adresse extends Component {
  static propTypes = {
    adress: PropTypes.object.isRequired,
    onLaunch: PropTypes.func.isRequired,
  };

  render() {
    const component = convert(this.props.adress, this.props.onLaunch);
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Adresse);