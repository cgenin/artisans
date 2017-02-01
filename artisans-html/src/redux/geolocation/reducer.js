import {DEB, START, RESULTS, ERROR} from './actions';
import Local from '../../services/localforage';
const key = require('../keys.json');

const defaultState = Local.initialize('geolocation', {
  CST_START: 1,
  CST_DEB: 0,
  CST_RESULTS: 2,
  CST_ERROR: 3,
  step: 0,
  results: {},
  msg: {}, key
});

export default function reducer(state = defaultState, action) {
  const cl = Object.assign({}, state);
  switch (action.type) {
    case DEB:
      return defaultState;
    case START:
      cl.step = cl.CST_START;
      return cl;
    case RESULTS:
      cl.step = cl.CST_RESULTS;
      const {lat, lon} = action;
      cl.results = {lat, lon};
      return cl;
    case ERROR:
      cl.step = cl.CST_ERROR;
      const {msg} = action;
      cl.msg = msg;
      return cl;
    default:
      return state;
  }

}