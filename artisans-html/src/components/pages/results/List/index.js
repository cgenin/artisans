import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import  Paper from 'material-ui/Paper/Paper';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';

import './list.css';
import InnerList from './InnerList';
import Routes from '../../../../Routes';
import {mapStateToProps, mapDispatchToProps, callConponentDidMount} from '../../../../services/results';


class List extends Component {

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
    this.onGoToUpdate = this.onGoToUpdate.bind(this);
    this.onGoToMap = this.onGoToMap.bind(this);
  }

  onGoToUpdate() {
    this.context.router.push(Routes.search.step0.fullpath);
  }

  onGoToMap() {
    const {id, lat, lon, codepostal} =this.context.router.params;
    this.context.router.push(Routes.results.map.fullpath(id, lat, lon, codepostal));
  }

  componentDidMount() {
    callConponentDidMount(this);
  }


  render() {
    return (
      <div className="list-container">
        <Paper transitionEnabled={true} style={{padding: 10}} zDepth={2}>
          <div id="list-container-panel">
            <div className="title">
              <h1>Liste des artisans</h1>
            </div>
            <div className="buttons">
              <RaisedButton data-tooltip="Modifier la recherche" onClick={this.onGoToUpdate} icon={<EditorModeEdit />}
                            label="Modifier"/>
              <RaisedButton data-tooltip="Afficher la carte" onClick={this.onGoToMap} icon={<MapsDirectionsRun />}
                            label="Carte"/>
              <FlatButton title="Recharger" icon={<ActionAutorenew />}/>
            </div>
            <InnerList artisans={this.props.artisans}/>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
