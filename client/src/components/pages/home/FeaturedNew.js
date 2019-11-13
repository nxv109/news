import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../actions/new.action";

export default function FeaturedNew() {
  const dispatch = useDispatch();
  const appState = useSelector(state => state);

  React.useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="col-lg-6 main-featured-new">
        <h3 className="mb-3">Tin tức nổi bật</h3>
        {appState.news.data
          ? appState.news.data.map((item, index) => (
              <div key={index} className="featured-new p-3 bg-white rounded">
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
              </div>
            ))
          : null}
      </div>
    </React.Fragment>
  );
}
