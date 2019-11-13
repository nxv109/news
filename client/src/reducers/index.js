import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import messageReducer from "./message.reducer";
import categoryReducer from "./category.reducer";
import newReducer from "./new.reducer";

const allReducers = combineReducers({
  users: userReducer,
  message: messageReducer,
  categories: categoryReducer,
  news: newReducer
});

export default allReducers;
