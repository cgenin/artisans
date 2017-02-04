import Api from '../../services/api';

export const RESET = 'actions:reset';
export const RESULTS = 'actions:results';

function reset() {
  return {
    type: RESET
  };
}

function results(artisans) {
  return {
    type: RESULTS, artisans
  };
}

export function search(key, lat, lon, dept) {
  return dispatch => {
    dispatch(reset());
    return Api.get(`/api/artisan/near?type=${key}&lat=${lat}&lon=${lon}&dept=${dept}`)
      .then(artisans => dispatch(results(artisans)));
  };
}