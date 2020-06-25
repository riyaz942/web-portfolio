import { SET_POSITION, CLEAR_POSITION, SET_DESTINATION } from 'Redux/constants/projectConstants';

export function setProjectPosition(position) {
  return {
    type: SET_POSITION,
    payload: position,
  }
}

export function setProjectDestination(imgPosition) {
  return {
    type: SET_DESTINATION,
    payload: {
      img: imgPosition,
    }
  }
}

export function clearProjectPosition() {
  return {
    type: CLEAR_POSITION
  };
}
