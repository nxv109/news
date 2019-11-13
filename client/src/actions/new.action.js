import axios from "axios";

const setNews = (data) => ({
  type: "GET_NEWS",
  payload: data
});

export const getNews = () => {
  return async dispatch => {
    const res = await axios.get("/news/published");
    const data = res.data.data;
    
    dispatch(setNews(data));
  };
};
