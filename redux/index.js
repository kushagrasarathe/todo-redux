// import { timestamp } from "@/src/utils/functions";
// import todoDetailsReducer from "./todoReducer";

// import { combineReducers, createStore }  from "redux";

// // const rootReducer = combineReducers({
// //   todoDetails: todoDetailsReducer,
// // });

// // const store = createStore(rootReducer);
// const store = createStore(todoDetailsReducer);

// store.subscribe(() => {
//   console.log(store.getState());
// });

// export default store;

import { db } from "@/src/utils/firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";
import redux, { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const initialState = [
  {
    data: "",
    createdAt: "",
    userId: "",
    isDone: false,
  },
];

const todoCollectionRef = collection(db, "todos");

export function setTodoDetails(todo) {
  return async (dispatchEvent) => {
    try {
      await addDoc(todoCollectionRef, todo);
      dispatchEvent({
        type: "SET_USER_DETAILS",
        payload: todo,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const todoDetailsReducer = (todo = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return {
        ...todo,
        // ...action.payload,
        data: action.payload.data,
        createdAt: action.payload.createdAt,
        userId: action.payload.userId,
        isDone: action.payload.isDone,
      };
    default:
      return todo;
  }
};

export function increment() {
  return (dispatch, getState) => {
    // const currentCount = getState();
    dispatch({ type: "INCREMENT" });
  };
}

export function decrement() {
  return {
    type: "DECREMENT",
  };
}

function reducer(count = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return count + 1;
    case "DECREMENT":
      return count - 1;
    default:
      return count;
  }
}

// const store = createStore(todoDetailsReducer, applyMiddleware(thunk));
const store = createStore(todoDetailsReducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
export default store;
