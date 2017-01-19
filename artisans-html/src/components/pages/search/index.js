import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import withWidth from 'material-ui/utils/withWidth';
import { connect } from 'react-redux';

import Breadcrumbs from '../../breadcrumbs/Breadcrumbs'
import './search.css';

const mapStateToProps = (state) => {
  const {step} = state.rechercher;
  return {
    step
  };
};

class Search extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Title render={(previousTitle) => `Rechercher - Artisans`}/>
        <Breadcrumbs index={this.props.step}/>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withWidth()(Search));
