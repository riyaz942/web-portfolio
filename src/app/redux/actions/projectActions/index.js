import { SET_POSITION, CLEAR_POSITION } from 'Redux/constants/projectConstants';

export function setProjectPosition(position) {
  return dispatch => {
    dispatch({
      type: SET_POSITION,
      payload: position,
    });
  }
}

export function clearProjectPosition() {
  return dispatch => {
    dispatch({type: CLEAR_POSITION});
  }
}
