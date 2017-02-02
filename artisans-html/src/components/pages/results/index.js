import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Title from 'react-title-component';
import muiThemeable from 'material-ui/styles/muiThemeable';
import withWidth from 'material-ui/utils/withWidth';



class Results extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
     return (
      <div style={{width:'100%'}}>
        <Title render={(previousTitle) => `Résultats`} />
        {this.props.children}
      </div>
    );
  }
}

export default muiThemeable()(withWidth()(Results));
