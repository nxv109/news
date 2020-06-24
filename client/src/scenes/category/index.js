import React from "react";
import {Helmet} from 'react-helmet';
import axios from "axios";

import NewsHighlight from "./NewsHighlight";
import NewsOther from "./NewsOther";
import FeaturedChannel from "../home/FeaturedChannel";
import LatestNew from "../home/LatestNew";

export default function Category({ match }) {
   const [highlightNew, setHighlightNew] = React.useState({});
   const [categoryName, setCategoryName] = React.useState("");
   const [tags, setTags] = React.useState([]);
   const [newByTag, setNewByTag] = React.useState([]);
   const id = match.params.id;

   React.useEffect(() => {
	  const fetchData = async () => {
		 const res = await axios.get(`/news/categories/${id}`);

		 function getTags() {
			let tagArr = [];

			res.data.data.map(item => tagArr.push(item.tag));

			const newTagArr = tagArr.flat(1);

			const result = [ ...new Set(newTagArr) ];
			return result;
		 }

		 function getDataByView(view) {
			return res.data.data.find(item => item.view > view);
		 }

		 const highlightNew = getDataByView(9);

		 setTags(getTags());
		 setHighlightNew(highlightNew);
		 setNewByTag(res.data.data)

		 setCategoryName(res.data.data[0].cateNews.name);
	  };

	  fetchData();
   }, [id]);

   return (
	  <>
		 <Helmet>
			<title>{` ${ categoryName ? categoryName + ' - BNews kênh tin tức hàng đầu Việt Nam' : "Loading..." } `}</title>
			<meta name="description" content="BNews kênh tin tức hàng đầu Việt Nam, thời dự, bóng đá, tin trong ngày, giải trí, bất động sản,..." />
		 </Helmet>
		 <React.Fragment>
			<div className="container">
			   <div className="row">
				  <div className="col-xl-9 col-lg-9 col-sm-12">
					 <NewsHighlight highlightNew={highlightNew} />
				  </div>
				  <div className="col-xl-3 col-lg-3 col-sm-12">
					 <div className="mb-4">
						<LatestNew />
					 </div>
					 <FeaturedChannel />
				  </div>
			   </div>
			</div>
		 </React.Fragment>
	  </>
   );
}
