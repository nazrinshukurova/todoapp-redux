// 3. **Task**: Create a simple Redux store in your project.


import { createStore } from "redux";
import todoReducer from "./todoReducer";

const store = createStore(todoReducer);

export default store;
