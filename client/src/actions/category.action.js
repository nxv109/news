import axios from "axios";

const setCategories = (data) => ({
  type: "GET_CATEGORIES",
  payload: data
});

export const getCategories = () => {
  return async dispatch => {
    const res = await axios.get("/cateNews");
    const data = res.data.data;
    
    dispatch(setCategories(data));
  };
};
