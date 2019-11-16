const initialState = { data: null };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, data: action.payload };
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
