import { SET_POSITION, CLEAR_POSITION } from 'Redux/constants/timelineConstant';

export function setTimelinePosition(position) {
  return dispatch => {
    dispatch({
      type: SET_POSITION,
      payload: position,
    });
  }
}

export function clearTimelinePosition() {
  return dispatch => {
    dispatch({type: CLEAR_POSITION});
  }
}
