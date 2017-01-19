export const STEP0 = 'rechercher:step0';
export const STEP1 = 'rechercher:step1';
export const STEP2 = 'rechercher:step2';
export const STEP3 = 'rechercher:step3';

export function step0() {
  return dispatch => {
    return new Promise((resolve) => {
      dispatch({type: STEP0});
      resolve(true);
    });
  };
}


export function step1(search) {
  return dispatch => {
    return new Promise((resolve) => {
      dispatch({
        type: STEP1, search
      });
      resolve(true);
    });
  }
}

export function step2() {
  return {
    type: STEP2
  };
}

export function step3() {
  return {
    type: STEP3
  };
}