import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import  './notInitliazedYet.css';

export default class ErrorView extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <div className="notif notif--error">
          <div className="notif__content">
            <i className="material-icons notif__icon">error</i>
            <div>
              <h1 className="notif__title">{this.props.title}</h1>
              <span className="notif__subtitle">{this.props.subtitle}</span>
            </div>
          </div>
          <div className="notif__actions">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
