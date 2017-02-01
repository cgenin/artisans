import {STEP0, STEP1, STEP2, STEP3} from './actions';
import Local from '../../services/localforage';

const defaultState = Local.initialize('rechercher', {
  step: 0,
  artisans: [],
  search: '',
  length: 0,
  selected: {},
  match: []
});

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

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
      changeStep2.artisans = flatten(action.artisans
        .map(a => a.keywords
          .map(v => {
            return {label: v, name: a.name, id: a.id, key: a.key};
          })
        )
      );
      const upper = action.search.toUpperCase();
      changeStep2.match = changeStep2.artisans.filter(a => upper.indexOf(a.label) !== -1 || a.label.indexOf(upper) !== -1);
      changeStep2.length = changeStep2.match.length;

      return Local.setState('rechercher', changeStep2);
    case STEP2:
      let value = changeStep(state, 2);
      value.selected = action.selected;
      return Local.setState('rechercher', value);
    case STEP3:
      return Local.setState('rechercher', changeStep(state, 3));
    default :
      return state;
  }

}
