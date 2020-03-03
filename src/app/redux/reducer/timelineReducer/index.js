import { SET_POSITION, CLEAR_POSITION } from 'Redux/constants/timelineConstant';

const initialState = {
  position: null
};

export default function timelineReducer(state = initialState, { type, payload }) {
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


// x: 829.2999877929688
// y: 313.6499938964844
// width: 120
// height: 39.6875
// top: 313.6499938964844
// right: 949.2999877929688
// bottom: 353.3374938964844
// left: 829.2999877929688