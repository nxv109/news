import React from "react";

import LatestNew from "./LatestNew";
import FeaturedNew from "./FeaturedNew";
import FeaturedChannel from "./FeaturedChannel";
import NewsOther from "./NewsOther";
import AdditionalNew from "./AdditionalNew";

const style = {
  background: "#3e4a5b",
  color: "#fff"
}

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <LatestNew />
        </div>
        <div className="col-lg-6 main-featured-new">
          <h3 className="mb-3">Tin tức nổi bật</h3>
          <FeaturedNew />
        </div>
        <div className="col-lg-3">
          <FeaturedChannel />
        </div>
      </div>
      <div style={style} className="row border border-secondary rounded mt-5 p-1">
        <AdditionalNew />
      </div>
      <div className="row">
        <div className="col-lg-9 main-featured-new">
          <h3 className="mb-3 mt-5">Dành cho bạn</h3>
          <NewsOther />
        </div>
      </div>
    </div>
  );
}
