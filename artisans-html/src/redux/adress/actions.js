import fetch from 'isomorphic-fetch';

export const DEB = 'adress:debut';
export const START = 'adress:START';
export const ERROR = 'adress:err';
export const RESULTS = 'adress:res';

function start(position) {
  return {
    type: START, position
  };
}

function error(msg) {
  return {
    type: ERROR, msg
  }
}


function results(res) {
  return {
    type: RESULTS, res
  }
}

export function back() {
  return {
    type: DEB
  };
}

export function launch(position) {

  return (dispatch) => {
    dispatch(start(position));
    const url = `https://api-adresse.data.gouv.fr/search/?q=${position.rue || ''} ${position.commune}&postcode=${position.codepostal}`
    fetch(url).then(
      res => {
        if (res.status >= 400) {
          console.error(res);
          dispatch(error(`Une erreur s'est produite lors de la recherche.`));
          return Promise.reject(true);
        }
       return res.json();

      }
    ).then(
      (json) =>  dispatch(results(json))
    );
  };
}