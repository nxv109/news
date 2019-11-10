import React from "react";

export default function FeaturedChannel() {
  return (
    <div className="col-sm-2">
      <h3 className="mb-3">Kênh uy tín</h3>
      <div className="channel p-1 bg-white rounded">
        <div className="channel__image rounded-circle">
          <img
            src="/uploads/news/57511910_833199540371570_201023415352748526_n_1_2.jpg"
            alt=""
          />
        </div>
        <div className="channel__info">
          <h5 className="channel__title">title</h5>
        </div>
      </div>
    </div>
  );
}
