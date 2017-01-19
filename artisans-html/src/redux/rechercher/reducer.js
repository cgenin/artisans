import {STEP0, STEP1, STEP2, STEP3} from './actions';

const defaultState = {
  step: 0,
  search:''
};

const changeStep = (state, step) => {
  const clone = Object.assign({}, state);
  clone.step = step;
  return clone;
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case STEP0:
      return changeStep(state, 0);
    case STEP1:
      const changeStep2 = changeStep(state, 1);
      changeStep2.search = action.search;
      return changeStep2;
    case STEP2:
      return changeStep(state, 2);
    case STEP3:
      return changeStep(state, 3);
    default :
      return state;
  }

}
