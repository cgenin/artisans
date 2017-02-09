import {search} from '../../redux/near/actions'
import Routes from '../../Routes';

export const mapStateToProps = (state) => {
  const {artisans} = state.near;
  return {artisans};
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (key, lat, lon, dept) => {
      return dispatch(search(key, lat, lon, dept));
    }
  }
};

const floor = (num) => {
  if (!num) {
    return '';
  }
  const str = num.toFixed(10);
  return str.substring(0, str.length - 7);
};

export const floorLabel = (art, small) => (small) ? `~ ${floor(art.distance)} km` : `Distance extimée : ${floor(art.distance)} km.`;

export const goToList = (obj) => {
  const {id, lat, lon, codepostal} =obj.context.router.params;
  obj.context.router.push(Routes.results.list.fullpath(id, lat, lon, codepostal));
};

export const goToMap = (obj) => {
  const {id, lat, lon, codepostal} =obj.context.router.params;
  obj.context.router.push(Routes.results.map.fullpath(id, lat, lon, codepostal));
};

export const gotoDetail = (obj) => {
  const {id, lat, lon, codepostal} =obj.context.router.params;
  return (index) => obj.context.router.push(Routes.results.detail.fullpath(id, lat, lon, codepostal, index));
};

export const callConponentDidMount = (obj) => {
  const {id, lat, lon, codepostal} =obj.context.router.params;
  obj.props.onLoad(id, lat, lon, codepostal);
};