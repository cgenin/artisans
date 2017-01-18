import {blue900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {},
  appBar: {
    color: blue900
  },
});

export default {
  muiTheme,
  drawer: {
    header: {color: blue900}
  }
}
