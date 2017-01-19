import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import withWidth from 'material-ui/utils/withWidth';
import Breadcrumbs from '../../breadcrumbs/Breadcrumbs'
import './search.css';



class Search extends Component {

    static propTypes = {
        children: PropTypes.array.isRequired,
    };

    render() {
    return (
      <div>
        <Title render={(previousTitle) => `Rechercher - Artisans`}/>
        <Breadcrumbs index={0} />
          {this.props.children}
      </div>
    );
  }
}

export default withWidth()(Search);
