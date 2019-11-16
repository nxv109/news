import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../actions/new.action";

export default function NewsWatchMuch(props) {
  const dispatch = useDispatch();
  const appState = useSelector(state => state);

  React.useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return(
    <React.Fragment>
      <div className="col-lg-8 main-featured-new p-0">
        <h3 className="mb-3 mt-5">Tin tức xem nhiều</h3>
        {appState.news.data
          ? appState.news.data.map((item, index) => (
              <Link to={`/${item._id}`} key={index} className="featured-new p-3 bg-white rounded text-decoration-none">
                <div className="featured-new__image border border-secondary">
                  <img
                    src={`/uploads/news/${item.articlePicture}`}
                    alt={item.title}
                  />
                </div>
                <div className="featured-new__info">
                  <h3 className="featured-new__title">{item.title}</h3>
                  <p className="featured-new__createby text-secondary">Creator: {item.createdBy.username} | Time: {item.dateCreate} | <i className="mdi mdi-eye" /> {item.view}</p>
                </div>
              </Link>
            ))
          : null}
      </div>
    </React.Fragment>
  )
}
