import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import List from '../../components/List';

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

  return (
    <React.Fragment>
	    <h3 className="mb-3 mt-3">Dành cho bạn</h3>
			<div className="position-relative">
				{
			   token
				  ?
				  news.length > 0
					 ? <List data={news} name="new_for_you" />
					 : <p className="text-secondary">Chưa có tin nào!</p>
					 : <p className="text-secondary">Đăng nhập để xem tin dành riêng cho bạn <Link to="/login" className="text-info">Đăng nhập</Link></p>
			}
		 </div>
	  </React.Fragment>
  );
}