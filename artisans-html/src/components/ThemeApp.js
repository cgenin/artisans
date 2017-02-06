import {blue900, green500, white} from 'material-ui/styles/colors';
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
    backgroundColor: green500,
    color: white,
    fontSize: 'bold',
    icons: {
      color: green500,
    }
  },
  drawer: {
    header: {
      color: blue900,
      characterColor: white
    }
  }
}
