import { SET_POSITION, CLEAR_POSITION } from 'Redux/constants/projectConstants';

const initialState = {
  imgPosition: null,
  slidePosition: null,
};

export default function projectReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_POSITION:
      const { img, slide } = payload;
      
      return {
        imgPosition: {
          x: img.x,
          y: img.y,
          width: img.width,
          height: img.height,
          top: img.top,
          right: img.right,
          bottom: img.bottom,
          left: img.left,
        },
        slidePosition: {
          x: slide.x,
          y: slide.y,
          width: slide.width,
          height: slide.height,
          top: slide.top,
          right: slide.right,
          bottom: slide.bottom,
          left: slide.left,
        }
      }
    case CLEAR_POSITION:
      return {
        imgPosition: null,
        slidePosition: null,
      }
    default:
      return state;
  }
}
