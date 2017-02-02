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

const mapStateToProps = (state) => {
  const {search} = state.rechercher;
  return {search};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onValidate: (search) => {
      return dispatch();
    }
  }
};

class List extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
              <RaisedButton data-tooltip="Modifier la recherche" icon={<EditorModeEdit />} label="Modifier"/>
              <RaisedButton data-tooltip="Afficher la carte" icon={<MapsDirectionsRun />} label="Carte"/>
              <FlatButton  title="Recharger"   icon={<ActionAutorenew />}/>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
