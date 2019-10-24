const initialState = { data: null };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
