import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DeviceSignalWifi4Bar from 'material-ui/svg-icons/device/signal-wifi-4-bar';
import {white} from 'material-ui/styles/colors';

const iconStyles = {
  margin: 10,
  color: white
};

class OnlineOrOfflineView extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DeviceSignalWifi4Bar style={iconStyles}/>
    );
  }
}

export default class OnlineChecker extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <OnlineOrOfflineView />
      </div>
    )
  }
}
