import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import { hanldeUrlPretty } from "../../mixin/UrlPretty";

export default function NewsOther() {
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
		 <div className="position-relative">
			{
			   token
				  ?
				  news.length > 0
					 ? news.map((item, index) => (
						<Link
						   to={`/${hanldeUrlPretty(item.title)}/${item._id}`}
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
								 <i className="mdi mdi-monitor" /> {item.createdBy.username}{" "}
								 - <i className="mdi mdi-av-timer" />{" "}
								 {moment(item.dateCreate).format("DD-MM-YYYY")} -{" "}
								 <i className="mdi mdi-eye" /> {item.view}
							  </p>
						   </div>
						</Link>
					 ))
					 : <p className="text-secondary">Chưa có tin nào!</p>
					 : <p className="text-secondary">Đăng nhập để xem tin dành riêng cho bạn <Link to="/login" className="text-info">Đăng nhập</Link></p>
			}
		 </div>
	  </React.Fragment>
   );
}
