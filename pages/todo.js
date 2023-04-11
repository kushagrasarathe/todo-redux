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
} from "@firebase/firestore";
import { db } from "../src/utils/firebaseConfig";

const todoCollectionRef = collection(db, "todos");

export default function Todo() {
  const [todo, setTodo] = useState({
    data: "",
    createdAt: "",
    userId: "",
    isDone: false,
  });

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(todoCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchData(data);
    });
    return () => unsub();
  }, []);

  const { logout, user } = useAuth();

  const saveTodo = async () => {
    await addDoc(todoCollectionRef, {
      data: todo.data,
      createdAt: timestamp(),
      userId: user.uid,
      isDone: false,
    });
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
        <button onClick={saveTodo} type="button">
          Save
        </button>
        <button onClick={fetch} type="button">
          Fetch
        </button>
      </div>
      <div>
        {fetchData.map((item, idx) => (
          <div key={idx}>
            <span>{item.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
