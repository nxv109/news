import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getNewsOther } from "../../actions/new.action";

import List from '../../components/List';

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
        if (appState.news.other.length >= number) {
          setLoading(true);
          number = (await appState.news.other.length) + 5;
          await dispatch(getNewsOther(number));

          loadMore();
        } else {
          setLoading(false);
        }
      }
    }
  };

  const news = React.useMemo(() => {
    return appState.news.other || [];
  }, [appState.news.other]);

  return (
    <React.Fragment>
      <h3 className="mb-3 mt-3">Tin khác</h3>
      <List data={news} name="new_for_you" />
      <div className="text-center">
        <button className="btn btn-light text-dark" onClick={hanldeLoadMore}>Xem thêm { loading ? <i className="mdi mdi-loading mdi-spin" /> : null }</button>
      </div>
    </React.Fragment>
  );
}