const initialState = {
  images: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
