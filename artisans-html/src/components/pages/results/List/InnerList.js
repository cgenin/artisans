import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator/RefreshIndicator';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import {red500, yellow600, green500} from 'material-ui/styles/colors';

import {floorLabel} from '../../../../services/results'


const dist2Color = (distance) => {
  if (distance) {
    if (distance < 10)
      return green500;
    if (distance < 25) {
      return yellow600;
    }
  }
  return red500;
};

class InnerList extends Component {

  static propTypes = {
    artisans: PropTypes.object,
    onGotoDetail: PropTypes.func.isRequired,
    small: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {limit: 20, size: 20};
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd() {
    const limit = this.state.limit + this.state.size;
    if (this.props.artisans.length <= limit) {
      this.setState({limit: this.props.artisans.length});
      return;
    }
    this.setState({limit});
  }

  render() {

    if (!this.props.artisans) {
      return (<div>
        <RefreshIndicator
          size={70}
          left={70}
          top={0}
          loadingColor="#FF9800"
          status="loading"
          style={ {
            display: 'inline-block',
            position: 'relative',
          }}
        />
      </div>);
    }

    const arts = this.props.artisans.results
      .filter((a, i) => i <= this.state.limit)
      .map(
        (art) => <ListItem key={art.redis}
                           leftAvatar={  <Avatar backgroundColor={dist2Color(art.distance)} icon={<FileFolder />}/>}
                           onClick={() => this.props.onGotoDetail(art.redis)} rightIcon={<ActionInfo />}
                           primaryText={art.name} secondaryText={floorLabel(art, this.props.small)}/>
      );
    const button = (this.props.artisans.length === 0 || this.props.artisans.length <= this.state.limit) ?
      (<div></div>) : (
        <RaisedButton icon={<ContentAddCircle/>} fullWidth={true} secondary={true} onClick={this.onAdd}/>
      );

    return (
      <List>
        <Subheader inset={true}>Résulltats : {this.props.artisans.length}</Subheader>
        {arts}
        {button}
      </List>
    );
  }
}

export default InnerList;
