import { SET_POSITION, CLEAR_POSITION } from 'Redux/constants/timelineConstant';

const initialState = {
  position: null
};

export default function timelineReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_POSITION:
      return {
        ...state,
        position: payload
      }
    case CLEAR_POSITION:
      return {
        position: null
      }
    default:
      return state;
  }
}
