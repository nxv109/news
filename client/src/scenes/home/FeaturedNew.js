import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../actions/new.action";

import List from '../../components/List/';
import { Link } from "react-router-dom";
import { urlPretty, isEmptyArray } from "../../helpers";
import BoxLoadingItem from "../../components/BoxLoadingItem/";
import moment from "moment";

export default function FeaturedNew() {
  const dispatch = useDispatch();
  const appState = useSelector(state => state);

  React.useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const news = React.useMemo(() => {
    return appState.news.data || [];
  }, [appState.news.data]);

  if (isEmptyArray(news)) return <BoxLoadingItem />;

  return (
    <React.Fragment>
      <h3 className="mb-3">Tin tức nổi bật</h3>
      <List>
        {news.map((item, index) => (
          <Link
            to={`/${urlPretty(item.title)}/${item._id}`}
            key={index}
            className="featured-new p-3 bg-white rounded text-decoration-none"
          >
            <div className="featured-new__image border border-secondary">
              <img
                src={`/uploads/news/${item.articlePicture}`}
                alt={item.title}
              />
            </div>
            <div className="featured-new__info">
              <h4 className="featured-new__title">{item.title}</h4>
              <p className="featured-new__createby text-secondary">
                <i className="mdi mdi-monitor" /> {item.createdBy.username} -{" "}
                <i className="mdi mdi-av-timer" />{" "}
                {moment(item.dateCreate).format("DD-MM-YYYY")} -{" "}
                <i className="mdi mdi-eye" /> {item.view}
              </p>
            </div>
          </Link>
        ))}
      </List>
    </React.Fragment>
  );
}