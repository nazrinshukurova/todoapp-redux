// 4. **Task**: Create a basic action to add an item to a list.


export const addItem = (task) => {
  return {
    type: "ADD_TASK",
    payload: task,
  };
};

export const removeItem = (id) => {
  return {
    type: "REMOVE_TASK",
    payload: id,
  };
};

export const toggleTask = (id) => {
  return {
    type: "TOGGLE_TASK",
    payload: id,
  };
};
