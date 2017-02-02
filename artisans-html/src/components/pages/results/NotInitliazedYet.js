import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './notInitliazedYet.css';
import Routes from '../../../Routes';

class NotInitliazedYet extends Component {

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
              <h1 className="notif__title">Pas de données</h1><span className="notif__subtitle">Vous devez d'abord cliquez sur rechercher avant de sélectionner un artisan.</span>
            </div>
          </div>
          <div className="notif__actions">
            <a data-tooltip="Rechercher" className="notif__action" href={Routes.search.fullpath}>
              <i className="material-icons">search</i>
            </a>
            <a data-tooltip="Accueil" className="notif__action" href={Routes.index.path}><i className="material-icons">home</i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default NotInitliazedYet;
