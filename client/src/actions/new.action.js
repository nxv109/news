import axios from "axios";

const setNews = (data) => ({
  type: "GET_NEWS",
  payload: data
});

const setNewsOther = (data) => ({
  type: "GET_NEWS_OTHER",
  payload: data
});

export const getNews = () => {
  return async dispatch => {
    const res = await axios.get("/news/published");
    const data = res.data.data;

    dispatch(setNews(data));
  };
};

export const getNewsOther = () => {
  return async dispatch => {
    const res = await axios.get("/news/other");
    const data = res.data.data;

    dispatch(setNewsOther(data));
  };
};
