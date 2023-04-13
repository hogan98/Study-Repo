// import PropTypes from "prop-types";
import React, { useContext, useMemo } from "react";
import { TodosContext } from "../context/TodosContext";

// TodoItemsRemaining.propTypes = {

//   // remaining: PropTypes.number.isRequired, //This one is cahnged to number for the new hook useMemo
//   remaining: PropTypes.func.isRequired,
// };

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);
  function remainingCalculation() {
    // console.log('calculating remaining todos. This is slow.');
    // for (let index = 0; index < 2000000000; index++) {}
    return todos.filter(todo => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  return <span>{remaining} items remaining</span>;
  // return <span>{props.remaining} items remaining</span>; This one is cahnged to Not take param for the new hook useMemo
}

export default TodoItemsRemaining;
