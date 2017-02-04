import {DEB, START, RESULTS, ERROR, UPDATE} from './actions';
import Local from '../../services/localforage';
const key = require('../../keys.json');

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
      return Local.setState('geolocation', defaultState);
    case START:
      cl.step = cl.CST_START;
      return Local.setState('geolocation', cl);
    case RESULTS:
      cl.step = cl.CST_RESULTS;
      const {lat, lon} = action;
      cl.results = {lat, lon};
      return Local.setState('geolocation', cl);
    case ERROR:
      cl.step = cl.CST_ERROR;
      const {msg} = action;
      cl.msg = msg;
      return cl;
    case UPDATE:
      const {json} = action;
      if (json.features && json.features.length > 0) {
        cl.results.street = json.features[0].properties;
      }
      return Local.setState('geolocation', cl);
    default:
      return state;
  }

}