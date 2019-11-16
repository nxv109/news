import axios from "axios";

export const addUser = data => ({
  type: "ADD",
  payload: data
});

const setUsers = (data) => ({
  type: "GET_USERS",
  payload: data
});

export const getUsers = () => {
  return async dispatch => {
    const res = await axios.get('/users/channels');
    const data = res.data.data;

    dispatch(setUsers(data));
  }
};
