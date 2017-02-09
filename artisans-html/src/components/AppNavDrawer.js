import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem  from 'material-ui/List/ListItem';
import  makeSelectable  from 'material-ui/List/makeSelectable';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import spacing from 'material-ui/styles/spacing';
import  typography from 'material-ui/styles/typography';
import zIndex from 'material-ui/styles/zIndex';
import ThemeApp from './ThemeApp';


import Routes from '../Routes';

const SelectableList = makeSelectable(List);


const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: ThemeApp.drawer.header.color,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
};

class AppNavDrawer extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  state = {
    muiVersions: [],
  };

  componentDidMount() {

  }

  handleRequestChangeLink = (event, value) => {
    window.location = value;
  };

  handleTouchTapHeader = () => {
    this.context.router.push(Routes.index.path);
    this.props.onRequestChangeNavDrawer(false);
  };

  goToPage = (value) => {
    return (event) => {
      event.preventDefault();
      this.context.router.push(value);
      this.props.onRequestChangeNavDrawer(false);
    };
  };

  render() {
    const {
      docked,
      onRequestChangeNavDrawer,
      open,
      style,
    } = this.props;

    return (
      <Drawer style={style} docked={docked} open={open} onRequestChange={onRequestChangeNavDrawer}
              containerStyle={{zIndex: zIndex.drawer - 100}}>
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Artisans
        </div>
        <Subheader>Navigation</Subheader>
        <ListItem primaryText="Accueil" href={Routes.home.fullpath}
                  onClick={this.goToPage(Routes.home.fullpath)}
                  onTouchTap={this.goToPage(Routes.home.fullpath)}/>
        <ListItem primaryText="1. Rechercher" href={Routes.search.fullpath}
                  onClick={this.goToPage(Routes.search.fullpath)}
                  onTouchTap={this.goToPage(Routes.search.fullpath)}/>
        <ListItem primaryText="2. Sélectionner" href={Routes.results.fullpath}
                  onClick={this.goToPage(Routes.results.fullpath)}
                  onTouchTap={this.goToPage(Routes.results.fullpath)}/>

        <Divider />
        <SelectableList
          value=""
          onChange={this.handleRequestChangeLink}
        >
          <Subheader>Resources</Subheader>
          <ListItem primaryText="GitHub" alt="Github du développeur" value="https://github.com/cgenin"/>
          {/*<ListItem primaryText="React" value="http://facebook.github.io/react"/>*/}
          {/*<ListItem*/}
            {/*primaryText="Material Design"*/}
            {/*value="https://www.google.com/design/spec/material-design/introduction.html"*/}
          {/*/>*/}
        </SelectableList>
      </Drawer>
    );
  }
}

export default AppNavDrawer;
