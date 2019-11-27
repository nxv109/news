import React from "react";
import axios from "axios";

import NewsDetail from "./NewsDetail";
import NewsSimilar from "./NewsSimilar";
import NewsOther from "../home/NewsOther";
import NewsWatchMuch from "../home/FeaturedNew.js";
import FeaturedChannel from "../home/FeaturedChannel.js";
import LatestNew from "../home/LatestNew.js";

export default function Detail({ match, location }) {
  const [ datas, setDatas ] = React.useState([]);
  const id = match.params.id;

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/news/details/${id}`);

      setDatas(res.data.data[0]);
    };

    fetchData();
  }, [id]);

  return(
    <React.Fragment>
      <div className="container">
        <div className="row">
          <NewsDetail datas={datas} />
          <div className="col-lg-4">
            <div className="mb-4">
              <LatestNew />
            </div>
            <FeaturedChannel />
          </div>
        </div>
        <div className="row">
          <NewsSimilar id={datas.cateNews} />
        </div>
        <div className="row">
          <div className="col-lg-8 main-featured-new p-0">
            <h3 className="mb-3 mt-5">Xem nhiều</h3>
            <NewsWatchMuch />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 p-0 main-featured-new">
            <h3 className="mb-3 mt-5">Tin khác</h3>
            <NewsOther />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
