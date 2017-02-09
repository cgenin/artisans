import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import  Paper from 'material-ui/Paper/Paper';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Divider from 'material-ui/Divider/Divider';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import withWidth, {SMALL} from 'material-ui/utils/withWidth';

import './list.css';
import HelpModal from '../../../help-modal/HelpModal';
import InnerList from './InnerList';
import Routes from '../../../../Routes';
import markdown from './list.md';

import {
  mapStateToProps,
  mapDispatchToProps,
  callConponentDidMount,
  goToMap,
  gotoDetail
} from '../../../../services/results';


class List extends Component {

  static propTypes = {
    artisans: PropTypes.object,
    onLoad: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.onGoToUpdate = this.onGoToUpdate.bind(this);
    this.onGoToMap = this.onGoToMap.bind(this);
    this.onGotoDetail = this.onGotoDetail.bind(this);
    this.onReload = this.onReload.bind(this);
  }

  onGoToUpdate() {
    this.context.router.push(Routes.search.step0.fullpath);
  }

  onGoToMap() {
    goToMap(this);
  }

  onGotoDetail() {
    return gotoDetail(this);
  }

  componentDidMount() {
    callConponentDidMount(this);
  }

  onReload() {
    callConponentDidMount(this);
  }

  render() {

    const small = this.props.width === SMALL;
    const labelModifier = (small) ? '' : 'Modifier';
    const labelCarte = (small) ? '' : 'Carte';
    return (
      <div className="list-container">
        <Paper transitionEnabled={true} style={{padding: 10}} zDepth={2}>
          <div id="list-container-panel">
            <div className="title">
              <h1>Liste des artisans</h1>
            </div>
            <div className="buttons">
              <RaisedButton data-tooltip="Modifier la recherche" onClick={this.onGoToUpdate} icon={<EditorModeEdit />}
                            label={labelModifier}/>
              <RaisedButton data-tooltip="Afficher la carte" onClick={this.onGoToMap} icon={<MapsDirectionsRun />}
                            label={labelCarte}/>
              <FlatButton title="Recharger" icon={<ActionAutorenew />} onClick={this.onReload}/>
            </div>
            <InnerList artisans={this.props.artisans} small={small} onGotoDetail={this.onGotoDetail()}/>
            <Divider/>
            <div className="help-container">
              <HelpModal text={markdown}/>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(List));
