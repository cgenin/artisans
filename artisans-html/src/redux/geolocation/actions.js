export const DEB = 'gps:debut';
export const START = 'gps:START';
export const ERROR = 'gps:err';
export const RESULTS = 'gps:res';

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