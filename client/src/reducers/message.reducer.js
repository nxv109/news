const initialState = {};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
