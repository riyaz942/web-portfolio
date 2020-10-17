import { SET_POSITION, CLEAR_POSITION, SET_DESTINATION } from 'Redux/constants/projectConstants';

const initialState = {
  imgPosition: null,
  slidePosition: null,
  imgDestination: null,
};

export default function projectReducer(state = initialState, { type, payload }) {

  switch (type) {
    case SET_POSITION:
      const { img, slide } = payload;

      // NOTE: data coming from payload is a weird object (DOMRect)
      // So have to parse it here
      return {
        ...state,
        imgPosition: {
          width: img.width,
          height: img.height,
          top: img.top,
          left: img.left,
        },
        slidePosition: {
          width: slide.width,
          height: slide.height,
          top: slide.top,
          left: slide.left,
        }
      }
    case SET_DESTINATION:
      const { img: destinationImg } = payload;

      return {
        ...state,
        imgDestination: {
          height: destinationImg.height,
          width: destinationImg.width,
          top: destinationImg.top,
          left: destinationImg.left,
        },
      }
    case CLEAR_POSITION:
      return initialState;

    default:
      return state;
  }
}
