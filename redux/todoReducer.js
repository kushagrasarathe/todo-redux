import { timestamp } from "@/src/utils/functions";

const SET_TODO_DETAILS = "SET_TODO_DETAILS";

export function setTodoDetails(todo) {
  return {
    type: SET_TODO_DETAILS,
    payload: todo,
  };
}

const initialState = {
  description: "",
  date: timestamp(),
  id: Math.ceil(Math.random() * 200000),
  isDone: false,
};

const todoDetailsReducer = (todo = initialState, action) => {
  switch (action.type) {
    case SET_TODO_DETAILS:
      return {
        // ...todo,
        description: action.payload.description,
        date: action.payload.date,
        id: action.payload.id,
        isDone: action.payload.isDone,
      };
    default:
      todo;
  }
};

export default todoDetailsReducer;
