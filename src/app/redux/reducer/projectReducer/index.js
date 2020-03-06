import { SET_POSITION, CLEAR_POSITION } from 'Redux/constants/projectConstants';

const initialState = {
  position: null
};

export default function projectReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_POSITION:
      return {
        position: {
          x: payload.x,
          y: payload.y,
          width: payload.width,
          height: payload.height,
          top: payload.top,
          right: payload.right,
          bottom: payload.bottom,
          left: payload.left,
        }
      }
    case CLEAR_POSITION:
      return {
        position: null
      }
    default:
      return state;
  }
}
