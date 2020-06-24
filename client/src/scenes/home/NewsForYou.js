import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import List from '../../components/List/';
import { urlPretty, isEmptyArray } from "../../helpers";
import BoxLoadingItem from "../../components/BoxLoadingItem/";
import moment from "moment";

export default function NewsForYou() {
  const [news, setNews] = React.useState([]);
  const userId = sessionStorage.getItem('userId') || null;
  const token = localStorage.getItem("auth-token");

  React.useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const res = await axios.get("/news/newsForYou", { params: { userId: userId } });
        const data = res.data.data;

        setNews(data);
      };

      fetchData();
    }

  }, [userId]);

  if (!token) return (
    <p className="text-secondary mt-3">Đăng nhập để xem tin dành riêng cho bạn <Link to="/login" className="text-info">Đăng nhập</Link></p>
  );

  if (!news.length) return (<p className="text-secondary mt-3">Chưa có tin nào!</p>)

  if (isEmptyArray(news)) return <BoxLoadingItem />;

  return (
    <React.Fragment>
	    <h3 className="mb-3 mt-3">Dành cho bạn</h3>
			<div className="position-relative">
        <List>
          {news.map((item, index) => (
          <Link
            to={`/${urlPretty(item.title)}/${item._id}`}
            key={index}
            className="other-new p-3 bg-white rounded text-decoration-none"
          >
            <div className="other-new__image border border-secondary">
              <img
                src={`/uploads/news/${item.articlePicture}`}
                alt={item.title}
              />
            </div>
            <div className="other-new__info">
              <h4 className="other-new__title">{item.title}</h4>
              <p className="other-new__createby text-secondary">
                <i className="mdi mdi-monitor" /> {item.createdBy.username} -{" "}
                <i className="mdi mdi-av-timer" />{" "}
                {moment(item.dateCreate).format("DD-MM-YYYY")} -{" "}
                <i className="mdi mdi-eye" /> {item.view}
              </p>
            </div>
          </Link>
        ))}
				</List>
		 </div>
	  </React.Fragment>
  );
}