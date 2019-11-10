import React from "react";

export default function FeaturedNew() {
  return (
    <React.Fragment>
      <div className="col-sm-6 main-featured-new">
        <h3 className="mb-3">Tin tức nổi bật</h3>
        <div className="featured-new p-3 bg-white rounded">
          <div className="featured-new__image border border-secondary"><img src="/uploads/news/57511910_833199540371570_201023415352748526_n_1_2.jpg" alt="" /></div>
          <div className="featured-new__info">
            <h3 className="featured-new__title">title</h3>
            <p className="featured-new__createby">user | time</p>
          </div>
        </div>
        <div className="featured-new p-3 bg-white rounded">
          <div className="featured-new__image"><img src="/uploads/news/57511910_833199540371570_201023415352748526_n_1_2.jpg" alt="" /></div>
          <div className="featured-new__info">
            <h3 className="featured-new__title">title</h3>
            <p className="featured-new__createby">user | time</p>
          </div>
        </div>
        <div className="featured-new p-3 bg-white rounded">
          <div className="featured-new__image"><img src="/uploads/news/57511910_833199540371570_201023415352748526_n_1_2.jpg" alt="" /></div>
          <div className="featured-new__info">
            <h3 className="featured-new__title">title</h3>
            <p className="featured-new__createby">user | time</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
