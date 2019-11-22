import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { getNewsOther } from "../../../actions/new.action";
import Loading from "../../Loading";

export default function NewsOther() {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const appState = useSelector(state => state);
  let number = 0;

  React.useEffect(() => {
    dispatch(getNewsOther(8));

  }, [dispatch]);

  const hanldeLoadMore = () => {
    if (appState.news.other) {
      loadMore();

      // xử lý ẩn/hiện khi click vào load more
      async function loadMore() {
        if (appState.news.other.length > number) {
          setLoading(true);
          number = appState.news.other.length + 5;
          await dispatch(getNewsOther(number));

          loadMore();
        } else {
          setLoading(false);
        }
      }
    }
  };

  const other = React.useMemo(() => {
    return appState.news.other;
  }, [appState.news.other]);

  return (
    <React.Fragment>
      {other ? (other.map((item, index) => (
                <Link
                  to={`/${item._id}`}
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
                    <h3 className="featured-new__title">{item.title}</h3>
                    <p className="featured-new__createby text-secondary">
                      <i className="mdi mdi-monitor" /> {item.createdBy.username} | <i className="mdi mdi-av-timer" />{" "}
                      {moment(item.dateCreate).format("DD-MM-YYYY")} | <i className="mdi mdi-eye" />{" "}
                      {item.view}
                    </p>
                  </div>
                </Link>
              ))
      ) : (<Loading />)}
      {
        appState.news.other
        ? (<div className="load-more">
            {loading ? (<i className="mdi mdi-spin mdi-loading mdi-24px d-block mb-2" />) : null}
            <button className="btn btn-link" onClick={hanldeLoadMore}>LOAD MORE</button>
          </div>)
        : null
      }
    </React.Fragment>
  );
}
