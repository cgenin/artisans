import {DEB, START, RESULTS, ERROR} from './actions';
import Local from '../../services/localforage';

const key = require('../keys.json');

const defaultState = Local.initialize('adress', {
  CST_START: 1,
  CST_DEB: 0,
  CST_RESULTS: 2,
  CST_ERROR: 3,
  step: 0,
  position: {},
  results: {},
  msg: {}, key
});

export default function reducer(state = defaultState, action) {
  const cl = Object.assign({}, state);
  switch (action.type) {
    case DEB:
      cl.step = cl.CST_DEB;
      return Local.setState('adress', cl);
    case START:
      cl.step = cl.CST_START;
      cl.position = action.position;
      return Local.setState('adress', cl);
    case RESULTS:
      cl.step = cl.CST_RESULTS;
      if (action.res.features.length > 0) {
        const feature = action.res.features[0];
        cl.results.lat = feature.geometry.coordinates[1];
        cl.results.lon = feature.geometry.coordinates[0];
        cl.results.street = feature.properties;
      } else {
        cl.results.lat = null;
        cl.results.lon = null;
      }
      cl.results.ws = action.res;

      return Local.setState('adress', cl);
    case ERROR:
      cl.step = cl.CST_ERROR;
      const {msg} = action;
      cl.msg = msg;

      return Local.setState('adress', cl);
    default:
      return state;
  }
}