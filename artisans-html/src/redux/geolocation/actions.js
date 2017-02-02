import fetch from 'isomorphic-fetch';

export const DEB = 'gps:debut';
export const START = 'gps:START';
export const ERROR = 'gps:err';
export const RESULTS = 'gps:res';
export const UPDATE = 'gps:update-street';

function start() {
  return {
    type: START
  };
}

function error(msg) {
  return {
    type: ERROR, msg
  }
}


function results(lat, lon) {
  return {
    type: RESULTS, lat, lon
  }
}

function updateStreet(json) {
  return {
    type: UPDATE, json
  }
}

export function launch() {

  return (dispatch) => {
    dispatch(start());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(results(position.coords.latitude, position.coords.longitude));
        }, (err) => {
          console.error(err);
          switch (err.code) {
            case err.PERMISSION_DENIED:
              dispatch(error('Vous avez refusé la fonction de géolocalisation.'));
              break;
            case err.POSITION_UNAVAILABLE:
              dispatch(error(`la position n'est pas accessible.`));
              break;
            case err.TIMEOUT:
              dispatch(error(`Time out de la requête.`));
              break;
            default:
              dispatch(error(`une erreur inconnue s'est produite.`));
              break;
          }
        });

    } else {
      dispatch(error(`La géolocalistion n'est pas supporté par votre appareil.`))
    }
  };
}

export function reverse(lat, lon) {
  return (dispatch) => {
    fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`)
      .then(
        res => {
          if (res.status >= 400) {
            console.error(res);
            return Promise.reject(true);
          }
          return res.json();
        }
      )
      .then(json => dispatch(updateStreet(json)));
  }
}