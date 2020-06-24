import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLatestNews } from "../../actions/new.action";

import List from '../../components/List/';

import { Link } from "react-router-dom";
import { urlPretty, isEmptyArray } from "../../helpers";
import BoxLoadingItem from "../../components/BoxLoadingItem/";

export default function LatestNew() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLatestNews());

  }, [dispatch]);

  const news = React.useMemo(() => {
    return appState.news.latest || [];
  }, [appState.news.latest]);

  if (isEmptyArray(news)) return <BoxLoadingItem />;

  return (
    <div>
      <h3 className="mb-3">Tin tức mới nhất</h3>
      <List>
        {news.map((item, index) => (
          <Link
            to={`/${urlPretty(item.title)}/${item._id}`}
            key={index}
            className="latest-new p-1 bg-white rounded text-decoration-none text-dark"
          >
            <div className="latest-new__image">
              <img
                src={`/uploads/news/${item.articlePicture}`}
                alt={item.title}
              />
            </div>
            <div className="latest-new__info">
              <h5 className="latest-new__title">{item.title}</h5>
            </div>
          </Link>
        ))}
      </List>
    </div>
  );
}