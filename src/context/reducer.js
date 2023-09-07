export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_TASK":
      return { ...state, active: [...state.active, action.payload] };
      break;
    case "FETCH_FROM_DB":
      return {
        active: action.payload.active,
        completed: action.payload.completed,
      };
      break;
    case "CHECKBOX_CLICK":
      return {
        ...state,
        active: state.active.map((task) =>
          task.id == action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };
      break;
    case "MOVE_TO_COMPLETED":
      return {
        active: state.active.filter((task) => task.id !== action.payload),
        completed: [
          ...state.completed,
          ...state.active.filter((task) => task.id === action.payload),
        ],
      };
      break;
    case "DELETE_FROM_COMPLETED":
      return {
        ...state,
        completed: state.completed.filter((task) => task.id !== action.payload),
      };
      break;

    default:
      break;
  }
};
