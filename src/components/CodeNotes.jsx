import { useEffect, useRef } from "react"; //add  useMemo, here when using this hook
import "../App.css";
import { TodosContext } from "../context/TodosContext";
import useLocalStorage from "../hooks/useLocalStorage";
import "../reset.css";
import NoTodos from "./NoTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
  // const [name, setName] = useState("");
  const [name, setName] = useLocalStorage("name", "");
  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage("todos", []);

  //state we are defining and hook
  // const [todos, setTodos] = useState([ //dont need set values anymore
  //   //todos is the state and setTodos is setter for state
  //   {
  //     id: 1,
  //     title: "finish React Series",
  //     isComplete: false,
  //     isEditing: false,
  //   },

  //   {
  //     id: 2,
  //     title: "Go Grocery",
  //     isComplete: true,
  //     isEditing: false,
  //   },

  //   {
  //     id: 3,
  //     title: "Take Over World",
  //     isComplete: false,
  //     isEditing: false,
  //   },
  //]);

  // const [idForTodo, setIdForTodo] = useState(4);
  const [idForTodo, setIdForTodo] = useLocalStorage("idForTodo", 1);

  //for deleting todo
  function deleteTodo(id) {
    // console.log("deleting todo id" + id);
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    //to put line through the todos to mark as complete
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  //Function for double click to edit
  function markAsEditing(id) {
    //to put line through the todos to mark as complete
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  //Function for Clicking off edit to close it
  function updateTodo(event, id) {
    // console.log(event.target.value);
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  //Function for pressing escape to cancel edit
  function cancelEdit(event, id) {
    //to put line through the todos to mark as complete
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }
  //for the 3 items raimining
  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  function remainingCalculation() {
    //For useMemo
    //   // console.log("Calculating remaining todos, this is slow");
    //   // for (let index = 0; index < 2000000000; index++) {} //This Makes computer slow on purpose
    return todos.filter(todo => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]); //For useMemo

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }

  function todosFiltered(filter) {
    if (filter === "all") {
      return todos;
    } else if (filter === "active") {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === "completed") {
      return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    //console.log("use effect running"); //For cleanup
    nameInputEl.current.focus(); //This Make the first input box focus when openend
    // console.log("use EFFECt");

    // setName(JSON.parse(localStorage.getItem("name")) ?? ""); //this stores it in localStorage have to use parse over using stringify below

    return function cleanup() {
      //console.log("cleaning up"); //used for event listeners for unnmounting
    };
  }, []); //will only run when todos are updated[todos] use empty bracket for only run when component mounts check Dev Tools

  function handleNameInput(event) {
    //update name and store in Local Storage
    setName(event.target.value);
    // localStorage.setItem("name", JSON.stringify(event.target.value)); //adds to local storage
  }
  return (
    <TodosContext.Provider value={{ todos, setTodos, idForTodo, setIdForTodo }}>
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-Container">
            <h2>What is Your Name?</h2>
            <form action="#">
              <input
                type="text"
                ref={nameInputEl}
                className="todo-input"
                placeholder="What is your name?"
                value={name}
                onChange={handleNameInput} //thisupdates the name
              />
            </form>
            {name && <p className="name-label">Hello, {name}</p>}
          </div>
          <h2>Todo App</h2>
          <TodoForm />
          {/* looping over  */}
          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              completeTodo={completeTodo}
              markAsEditing={markAsEditing}
              updateTodo={updateTodo}
              cancelEdit={cancelEdit}
              deleteTodo={deleteTodo}
              remaining={remaining}
              clearCompleted={clearCompleted}
              completeAllTodos={completeAllTodos}
              todosFiltered={todosFiltered}
            />
          ) : (
            <NoTodos />
          )}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
