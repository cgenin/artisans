import Api from '../../services/api';
export const STEP0 = 'rechercher:step0';
export const STEP1 = 'rechercher:step1';
export const STEP2 = 'rechercher:step2';
export const STEP3 = 'rechercher:step3';
export const AWAIT = 'rechercher:AWAIT';

export function step0() {
  return dispatch => {
    return new Promise((resolve) => {
      dispatch({type: STEP0});
      resolve(true);
    });
  };
}

function awaiting() {
  return {
    type: AWAIT
  }
}

export function step1(search) {
  return dispatch => {
    dispatch(awaiting());
    return Api.get('/api/artisan/type')
      .then(artisans => dispatch({type: STEP1, search, artisans}));
  };
}

export function step2(selected) {
  return dispatch => {
    dispatch({type: STEP2, selected});
    return Promise.resolve(true);
  };
}

export function step3() {
  return dispatch => {
    dispatch({type: STEP3});
    return Promise.resolve(true);
  };
}

