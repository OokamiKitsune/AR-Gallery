import { configureStore } from "redux";
import imageReducer from "../imageReducer/imageReducer";

const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

export default store;
