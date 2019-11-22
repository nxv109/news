import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../actions/new.action";
import moment from "moment";
import Loading from "../../Loading";


export default function FeaturedNew() {
  const dispatch = useDispatch();
  const appState = useSelector(state => state);

  React.useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const featured = React.useMemo(() => {
    return appState.news.data;
  }, [appState.news.data]);

  return (
    <React.Fragment>
      {featured
        ? featured.map((item, index) => (
            <Link to={`/${item._id}`} key={index} className="featured-new p-3 bg-white rounded text-decoration-none">
              <div className="featured-new__image border border-secondary">
                <img
                  src={`/uploads/news/${item.articlePicture}`}
                  alt={item.title}
                />
              </div>
              <div className="featured-new__info">
                <h3 className="featured-new__title">{item.title}</h3>
                <p className="featured-new__createby text-secondary"><i className="mdi mdi-monitor" /> {item.createdBy.username} | <i className="mdi mdi-av-timer" /> {moment(item.dateCreate).format("DD-MM-YYYY")} | <i className="mdi mdi-eye" /> {item.view}</p>
              </div>
            </Link>
          ))
        : (<Loading />)}
    </React.Fragment>
  );
}
