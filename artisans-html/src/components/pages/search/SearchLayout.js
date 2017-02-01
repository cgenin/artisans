import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Card  from 'material-ui/Card/Card';
import  CardHeader  from 'material-ui/Card/CardHeader';

export default class SearchLayout extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const sub = this.props.subtitle || '';
    return (
      <div className="speech-bubble-container">
        <Card initiallyExpanded={true} style={{width: 328}}>
          <CardHeader title={this.props.title} subtitle={sub}/>
          {this.props.children}
        </Card>
      </div>
    );
  }
}