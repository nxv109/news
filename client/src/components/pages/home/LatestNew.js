import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getLatestNews } from "../../../actions/new.action";
import Loading from "../../Loading";

export default function LatestNew() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLatestNews());

  }, [dispatch]);

  return (
    <div className="col-lg-4">
      <h3 className="mb-3">Tin tức mới nhất</h3>
      {
        appState.news.latest
        ? (
          appState.news.latest.map((item, index) => (
            <Link to={`/${item._id}`} key={index} className="latest-new p-1 bg-white rounded text-decoration-none text-dark">
              <div className="latest-new__image">
                <img
                  src={`/uploads/news/${item.articlePicture}`}
                  alt={item.title}
                />
              </div>
              <div className="latest-new__info">
                <h5 className="latest-new__title">{item.title}</h5>
                <p className="featured-new__createby text-secondary"><i className="mdi mdi-monitor" /> {item.createdBy.username} | <i className="mdi mdi-eye" /> {item.view}</p>
              </div>
            </Link>
          ))
        )
        : (<Loading />)
      }
    </div>
  );
}