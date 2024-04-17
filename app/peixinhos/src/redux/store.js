import { createStore} from "redux";
import music_reducer from "./reducers/music_reducer";

const store = createStore(
  music_reducer
);

export {store};