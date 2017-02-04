import {RESET, RESULTS} from './actions';
import Local from '../../services/localforage';

const defaultState = Local.initialize('near', {
  artisans: null
});

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case RESET:
      return Local.setState('near', defaultState);
    case RESULTS:
      const {artisans} = action;
      return Local.setState('near', {artisans});
    default:
      return state;
  }
}
