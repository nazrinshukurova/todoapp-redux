const initialState = {
    tasks: [],
  };
  
  const todoReducer = (state = initialState, action) => {
    // 5. **Task**: Create a reducer to handle adding items to a list.

    switch (action.type) {
      case "ADD_TASK":
        return {
          ...state,
          tasks: [
            ...state.tasks,
            { id: state.tasks.length + 1, text: action.payload, completed: false },
          ],
        };
      case "REMOVE_TASK":
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      case "TOGGLE_TASK":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload
              ? {
                  ...task,
                  completed: !task.completed,
                }
              : task
          ),
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  