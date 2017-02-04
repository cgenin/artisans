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

export const goToList = (obj) => {
  const {id, lat, lon, codepostal} =obj.context.router.params;
  obj.context.router.push(Routes.results.list.fullpath(id, lat, lon, codepostal));
};

export const callConponentDidMount = (obj) => {
  const {id, lat, lon, codepostal} =obj.context.router.params;
  obj.props.onLoad(id, lat, lon, codepostal);
};