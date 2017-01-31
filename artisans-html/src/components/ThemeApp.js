import {blue900, green500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {},
  appBar: {
    color: blue900
  },
});

export default {
  muiTheme,
  selectionrechercher: {
    color: green500,
    fontSize: 'bold',
    icons: {
      color: green500,
    }
  },
  drawer: {
    header: {color: blue900}
  }
}
