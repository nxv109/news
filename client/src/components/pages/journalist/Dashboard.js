import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ViewsTotal from "./statisticals/ViewsTotal";
import Follow from "./statisticals/Follow";
import BestNews from "./statisticals/BestNews";

export default function Dashboard() {
  const [month, setMonth] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());

  const handleChangeMonth = (date) => {
    const month = moment(date).utc().format("YYYY-MM-DD");
    setMonth(month);
    setStartDate(date)
  };

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-danger text-white mr-2">
            <i className="mdi mdi-home" />
          </span>
          Dashboard
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span />
              Overview
              <i className="mdi mdi-alert-circle-outline icon-sm text-danger align-middle" />
            </li>
          </ul>
        </nav>
      </div>
      <div className="row">
        <div style={{ alignItems: "center" }} className="col-xl-12 grid-margin stretch-card font-weight-bold">Lượt xem theo tháng: 
          <DatePicker
            selected={startDate}
            onChange={date => handleChangeMonth(date)}
            dateFormat="yyyy/MM"
            showMonthYearPicker
            className="border border-white rounded-pill ml-1 p-1"
          />
        </div>
        <div className="col-xl-12 grid-margin stretch-card">
          <ViewsTotal month={month} />
        </div>
      </div>
      <div className="row">
        <div style={{ alignItems: "center" }} className="col-xl-6 grid-margin font-weight-bold">Lượt follows: 
          <Follow />
        </div>
        <div className="col-xl-6 grid-margin font-weight-bold"> 
          <div>Top 5 bài viết nổi bật:</div>
          <BestNews />
        </div>
      </div>
    </div>
  );
}
