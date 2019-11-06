const initialState = { data: null };

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
