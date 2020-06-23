import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../actions/new.action";

import List from '../../components/List';

export default function FeaturedNew() {
  const dispatch = useDispatch();
  const appState = useSelector(state => state);

  React.useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const news = React.useMemo(() => {
    return appState.news.data || [];
  }, [appState.news.data]);

  return (
    <React.Fragment>
      <h3 className="mb-3">Tin tức nổi bật</h3>
      <List data={news} name="featured_new" />
    </React.Fragment>
  );
}