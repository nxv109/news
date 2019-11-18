const initialState = { data: null, other: null };

export default function newReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_NEWS":
      return { ...state, data: action.payload };
    case "GET_NEWS_OTHER":
      return { ...state, other: action.payload };
    case "GET_LATEST_NEWS":
      return { ...state, latest: action.payload };
    case "GET_SEARCH_NEWS":
      return { ...state, search: action.payload };
    default:
      return state;
  }
}
