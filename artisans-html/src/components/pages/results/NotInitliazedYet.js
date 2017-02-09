import React, {Component} from 'react';
import {Link} from 'react-router';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionHome from 'material-ui/svg-icons/action/home';
import {darkWhite} from 'material-ui/styles/colors';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ErrorView from '../../notify-view/ErrorView';
import Routes from '../../../Routes';

class NotInitliazedYet extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <ErrorView title="Pas de données"
                 subtitle="Vous devez d'abord cliquez sur rechercher avant de sélectionner un artisan.">
        <Link title="Rechercher" className="notif__action without-tooltip" to={Routes.search.fullpath}>
          <ActionSearch style={{color: darkWhite}}/>
        </Link>
        <Link title="Accueil" className="notif__action without-tooltip" to={Routes.index.path}>
          <ActionHome style={{color: darkWhite}}/>
        </Link>
      </ErrorView>

    );
  }
}

export default NotInitliazedYet;
