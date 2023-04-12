import { useAuth } from "@/src/context/AuthContext";
import { fetchTodos, timestamp } from "@/src/utils/functions";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../src/utils/firebaseConfig";
import { deleteTodo, markAsComplete, setTodoDetails } from "@/redux";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  DeleteBtn,
  Description,
  Form,
  Input,
  LogoutButn,
  MarkComplete,
  Navbar,
  SaveBtn,
  Title,
  TodoCard,
  Wrap,
} from "@/styles/Todo.styled";

const todoCollectionRef = collection(db, "todos");

const Todo = (props) => {
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

  const temp = {
    data: todo.data,
    createdAt: timestamp(),
    userId: user.uid,
    isDone: false,
  };

  return (
    <Container>
      <Navbar>
        <Title htmlFor="fname">ToDo</Title>
        <LogoutButn $primary onClick={logout}>
          Logout
        </LogoutButn>
      </Navbar>

      <div>
        <Input
          type="text"
          placeholder="enter a task"
          id="todoBody"
          name="todoBody"
          onChange={(e) =>
            setTodo((prevData) => ({ ...prevData, data: e.target.value }))
          }
          value={todo.data}
        />
        <Button $primary onClick={() => props.setTodoDetails(temp)}>
          Save Todo
        </Button>
      </div>
      <div>
        {loading ? (
          <span>loading...</span>
        ) : (
          fetchData
            .sort((a, b) => (a.isDone ? -1 : 1))
            .map(
              (todo, idx) =>
                todo.userId === user.uid && (
                  <TodoCard key={idx}>
                    <Wrap>
                      <div>
                        {todo.isDone && <span>✔</span>}
                        <Description>{todo.data}</Description>
                      </div>
                      <Wrap>
                        {!todo.isDone && (
                          <MarkComplete
                            onClick={() => props.markAsComplete(todo.id)}
                          >
                            ✅
                          </MarkComplete>
                        )}
                        <DeleteBtn onClick={() => props.deleteTodo(todo.id)}>
                          {/* Delete */}
                          <img src="https://img.icons8.com/arcade/32/null/filled-trash.png" />
                        </DeleteBtn>
                      </Wrap>
                    </Wrap>
                  </TodoCard>
                )
            )
        )}
      </div>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
