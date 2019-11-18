import axios from "axios";

const setNews = (data) => ({
  type: "GET_NEWS",
  payload: data
});

const setNewsOther = (data) => ({
  type: "GET_NEWS_OTHER",
  payload: data
});

const setLatestNews = (data) => ({
  type: "GET_LATEST_NEWS",
  payload: data
});

const setSearchNews = (data) => ({
  type: "GET_SEARCH_NEWS",
  payload: data
});

export const getNews = () => {
  return async dispatch => {
    const res = await axios.get("/news/published");
    const data = res.data.data;

    dispatch(setNews(data));
  };
};

export const getNewsOther = (number) => {
  return async dispatch => {
    const res = await axios.get("/news/other", { params: { number: number } });
    const data = res.data.data;

    dispatch(setNewsOther(data));
  };
};

export const getLatestNews = () => {
  return async dispatch => {
    const res = await axios.get("/news/latestNews");
    const data = res.data.data;

    dispatch(setLatestNews(data));
  };
};

export const getSearchNews = (textSearch) => {
  return async dispatch => {
    const res = await axios.get("/news/q", { params: { textSearch: textSearch } });
    const data = res.data.data;

    dispatch(setSearchNews(data));
  };
};
