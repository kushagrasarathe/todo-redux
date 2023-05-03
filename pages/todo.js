import { useAuth } from "@/src/context/AuthContext";
import { fetchTodos, timestamp } from "@/src/utils/functions";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../src/utils/firebaseConfig";
import { deleteTodo, markAsComplete, setTodoDetails } from "@/redux";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

const todoCollectionRef = collection(db, "todos");

const Todo = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const {user } = useAuth();

  return (
    <div>
      <h1 className="mt-24 mb-6 text-xl font-semibold leading-7 tracking-wide text-center ">
        Create and manage your todo lists
      </h1>
      <form
        className=" flex items-baseline justify-center gap-3 md:gap-5 flex-wrap"
        onSubmit={handleSubmit((data) =>
          props.setTodoDetails({
            data: data.todoDescription,
            createdAt: timestamp(),
            userId: user.uid,
            isDone: false,
          })
        )}
      >
        <div className=" flex flex-col items-start ">
          <input
            placeholder="enter your todo"
            {...register("todoDescription", { required: true })}
            className={`${
              errors.todoDescription &&
              " outline-1 outline-red-500 focus:outline-red-500"
            } outline-none p-2.5 w-96 rounded-md outline-2 focus:outline-blue-500`}
          />
          {errors.todoDescription && (
            <div className=" text-red-500 my-2">This field is required</div>
          )}
        </div>
        <button
          type="submit"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 `}
        >
          Save
        </button>
      </form>

      {/* <h2 className=" text-center m-5">Saved todos</h2> */}
      <div className=" flex flex-col justify-center items-center gap-x-3 gap-y-5 mt-5 ">
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          fetchData
            .sort((a, b) => (a.isDone ? -1 : 1))
            .map(
              (todo, idx) =>
                todo.userId === user.uid && (
                  <div
                    className=" p-5 rounded-md shadow-md bg-white w-96 md:w-2/6 flex justify-between items-start h-20 max-h-20 overflow-scroll "
                    key={idx}
                  >
                    <div className=" pr-3 text-justify">
                      <p>{todo.data}</p>
                    </div>
                    <div className=" flex items-center gap-3">
                      {todo.isDone && (
                        <span className=" text-sm text-green-700">
                          completed
                        </span>
                      )}
                      {!todo.isDone && (
                        <button
                          className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-2 text-center`}
                          onClick={() => props.markAsComplete(todo.id)}
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-2 text-center`}
                        onClick={() => props.deleteTodo(todo.id)}
                      >
                        Delete
                        {/* <img src="https://img.icons8.com/arcade/32/null/filled-trash.png" /> */}
                      </button>
                    </div>
                  </div>
                )
            )
        )}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
