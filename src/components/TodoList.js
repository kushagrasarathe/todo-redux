import { deleteTodo, markAsComplete, setTodoDetails } from "@/redux";
import { connect } from "react-redux";

const TodoList = (props) => {
  return (
    <div>
      {props.todo.isDone && <span>CCC</span>}
      <span>{props.todo.data}</span>
      <button onClick={() => props.deleteTodo(props.todo.id)}>Delete</button>
      <button onClick={() => props.markAsComplete(props.todo.id)}>
        Mark As Complete
      </button>
    </div>
  );
};

function mapStateToProps(globalState) {
  return {
    todo: globalState,
  };
}

const mapDispatchToProps = {
  setTodoDetails: setTodoDetails,
  deleteTodo: deleteTodo,
  markAsComplete: markAsComplete,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
