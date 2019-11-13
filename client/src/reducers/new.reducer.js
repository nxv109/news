const initialState = { data: null };

export default function newReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_NEWS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
