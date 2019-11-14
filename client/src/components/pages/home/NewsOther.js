import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getNewsOther } from "../../../actions/new.action";

export default function NewsOther() {
  const dispatch = useDispatch();
  const appState = useSelector(state => state);

  React.useEffect(() => {
    dispatch(getNewsOther());
  }, [dispatch]);

  console.log('news other', appState.news.other);

  return(
    <React.Fragment>
      {appState.news.other
        ? appState.news.other.map((item, index) => (
            <Link to={`/${item.title}/${item._id}`} key={index} className="featured-new p-3 bg-white rounded text-decoration-none">
              <div className="featured-new__image border border-secondary">
                <img
                  src={`/uploads/news/${item.articlePicture}`}
                  alt={item.title}
                />
              </div>
              <div className="featured-new__info">
                <h3 className="featured-new__title">{item.title}</h3>
                <p className="featured-new__createby text-secondary">Creator: {item.createdBy.username} | Time: {item.dateCreate}</p>
              </div>
            </Link>
          ))
        : null}
    </React.Fragment>
  )
}
