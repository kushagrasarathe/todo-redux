import { useAuth } from "@/src/context/AuthContext";
import { fetchTodos, timestamp } from "@/src/utils/functions";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../src/utils/firebaseConfig";
import store, {
  addTodoAction,
  decrement,
  deleteTodo,
  increment,
  setTodoDetails,
} from "@/redux";
import { connect, useDispatch, useSelector } from "react-redux";

const todoCollectionRef = collection(db, "todos");

function Todo(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [todo, setTodo] = useState({
    data: "",
    createdAt: "",
    userId: "",
    isDone: false,
  });
  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(todoCollectionRef, (snapshot) => {
      setLoading(true);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchData(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const { logout, user } = useAuth();

  const saveTodo = async (test) => {
    await addDoc(todoCollectionRef, {
      data: todo.data,
      createdAt: timestamp(),
      userId: user.uid,
      isDone: false,
    });
  };

  const temp = {
    data: todo.data,
    createdAt: timestamp(),
    userId: user.uid,
    isDone: false,
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <br />
      <br />
      <div>
        <label htmlFor="fname">Todo:</label>
        <br />
        <input
          type="text"
          id="todoBody"
          name="todoBody"
          onChange={(e) =>
            setTodo((prevData) => ({ ...prevData, data: e.target.value }))
          }
          value={todo.data}
        />
        <button onClick={() => props.setTodoDetails(temp)}>Save Todo</button>
        {/* <button onClick={saveTodo} type="button">
          Save
        </button> */}
        {/* <button onClick={fetch} type="button">
          Fetch
        </button> */}
      </div>
      <div>
        {loading ? (
          <span>loading...</span>
        ) : (
          fetchData.map(
            (item, idx) =>
              item.userId === user.uid && (
                <div key={idx}>
                  <span>{item.data}</span>
                  <button onClick={() => props.deleteTodo(item.id)}>
                    Delete
                  </button>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
}

function mapStateToProps(globalState) {
  return {
    todo: globalState,
  };
}

const mapDispatchToProps = {
  setTodoDetails: setTodoDetails,
  deleteTodo: deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
// connect(mapStateToProps, mapDispatchToProps)
