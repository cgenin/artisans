import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper/Paper';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import CommunicationPhone from 'material-ui/svg-icons/communication/phone';

export default class Contact extends Component {
  static propTypes = {
    tel: PropTypes.string,
    fax: PropTypes.string,
  };


  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  render() {
    if (!this.props.tel && !this.props.fax) {
      return <div></div>;
    }

    return (
      <Paper className="block" zDepth={1}>
        <h3>Contact : </h3>
        <div id="contact-block">
          <div className="panel">
            <p>
              <strong>Téléphone : </strong> {this.props.tel}
            </p>
            <p>
              <strong>Fax : </strong> {this.props.fax}
            </p>
          </div>
          <div className="panel">
            <FlatButton style={{width: '48px', height: '48px', color: 'green'}} href={`tel:${this.props.tel}`}
                        icon={<CommunicationPhone style={{width: '48px', height: '48px'}}/>}/>
          </div>
        </div>
      </Paper>
    );
  }
}
