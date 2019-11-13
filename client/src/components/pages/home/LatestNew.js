import React from "react";

export default function LatestNew() {
  return (
    <div className="col-lg-4">
      <h3 className="mb-3">Tin tức mới nhất</h3>
      <div className="latest-new p-1 bg-white rounded">
        <div className="latest-new__image">
          <img
            src="/uploads/news/Nhan-dinh-bong-da-Lokomotiv-Moscow---Juventus-Nhiem-vu-phai-thang-cho-Ronaldo-toa-sang-4-660-1573007636-705-width660height345.jpg"
            alt=""
          />
        </div>
        <div className="latest-new__info">
          <h5 className="latest-new__title">title</h5>
        </div>
      </div>
      <div className="latest-new p-1 bg-white rounded">
        <div className="latest-new__image">
          <img
            src="/uploads/news/57511910_833199540371570_201023415352748526_n_1_2.jpg"
            alt=""
          />
        </div>
        <div className="latest-new__info">
          <h5 className="latest-new__title">title</h5>
        </div>
      </div>
      <div className="latest-new p-1 bg-white rounded">
        <div className="latest-new__image">
          <img
            src="/uploads/news/57511910_833199540371570_201023415352748526_n_1_2.jpg"
            alt=""
          />
        </div>
        <div className="latest-new__info">
          <h5 className="latest-new__title">title</h5>
        </div>
      </div>
    </div>
  );
}
