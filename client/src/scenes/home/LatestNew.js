import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLatestNews } from "../../actions/new.action";

import List from '../../components/List';

export default function LatestNew() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLatestNews());

  }, [dispatch]);

  const news = React.useMemo(() => {
    return appState.news.latest || [];
  }, [appState.news.latest]);

  return (
    <div>
      <h3 className="mb-3">Tin tức mới nhất</h3>
      <List data={news} name="latest_new" />
    </div>
  );
}