import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper/Paper';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import ActionList from 'material-ui/svg-icons/action/list';

import {mapDispatchToProps, callConponentDidMount, goToMap, goToList, floorLabel} from '../../../../services/results';
import './detail.css';
import Contact from './Contact';
import Coords from './Coords';
import ThemeApp from '../../../ThemeApp';


const mapStateToProps = (state) => {
  const {artisans} = state.near;

  return {artisans};
};

class Detail extends Component {

  static propTypes = {
    artisans: PropTypes.object,
    onLoad: PropTypes.func.isRequired,
  };


  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    callConponentDidMount(this);
  }

  render() {
    if (!this.props.artisans || !this.props.artisans.results) {
      // TODO Waiting component
      return (
        <div></div>
      );
    }

    const {index} = this.context.router.params;
    const selected = this.props.artisans.results.find(a => a.redis === index);
    // TODO

    return (
      <div id="detail-container">
        <h1>Détail de l'artisan</h1>

        <Paper style={{color: ThemeApp.drawer.header.characterColor, backgroundColor: ThemeApp.drawer.header.color}}
               className="block" zDepth={2}>
          <h2 >Nom : {selected.name}</h2>
        </Paper>
        <Paper className="block" zDepth={1}>
          <h3>Adresse postale : </h3>
          <p>
            {selected.adress}
          </p>
          <p>
            {floorLabel(selected)}
          </p>
        <Coords lat={selected.coords.lat} lon={selected.coords.lon} label={selected.coords.label} />
        </Paper>
        <Contact fax={selected.contact.fax} tel={selected.contact.tel}/>
        <div id="bottom-buttons-block" className="block">
          <RaisedButton primary={true} onClick={() => goToList(this)} icon={<ActionList />} label="Liste"/>
          <RaisedButton primary={true} onClick={() => goToMap(this)} icon={<MapsDirectionsRun />} label="Carte"/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);