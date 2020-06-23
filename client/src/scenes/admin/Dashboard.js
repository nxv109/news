import React from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ViewsTotal from "./statisticals/ViewsTotal";
import Follow from "./statisticals/Follow";

export default function Dashboard() {
  const [news, setNews] = React.useState([]);
  const [month, setMonth] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/statisticals/viewsOfDay");

        setNews(res.data.data);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "0"];
  let rs = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

  // dem luot views cua tung tin tuc
  const countView = news.reduce((a, b) => {
    a[b['news']] = (++a[b['news']]) || 1;
    return a;
  }, {});

  const convertToArray = Object.entries(countView);

  let arr = [];
  news.map(v => {
    convertToArray.forEach(([key, value]) => {
      if (v.news === key) {
        arr.push({...v, views: value})
      }
    })

    return arr;
  });

  // lấy tổng views theo thời gian
  const arr1 = arr.reduce((prev, next) => {
    prev[next.date] = prev[next.date] + 1 > 1 ? prev[next.date] + next.views : next.views;

    return prev;
  }, {});

  // console.log("arr1", arr1);

  let rs1 = [];

  for (let key in arr1) {
    rs1.push({date: key, views: arr1[key]});
  }

  // console.log("rs1", rs1);

  // set views theo thoi diem
  rs1.map(v => {
    const time = moment(v.date).utc().format("H");

    if (labels.includes(time)) {
      rs.splice(labels.indexOf(time), 0, v.views);
    }

    return rs;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Views",
        bacgroundColor: "red",
        data: rs
      }
    ]
  }

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
        <div className="col-xl-12 grid-margin stretch-card font-weight-bold">Lượt xem trong ngày:</div>
        <div className="col-xl-12 grid-margin stretch-card">
          <Line
            data={data}
            height={300}
            options={{
              responsive: true,
              maintainAspectRatio: false
            }}
          />
        </div>
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
        <div style={{ alignItems: "center" }} className="col-xl-12 grid-margin stretch-card font-weight-bold">Số users theo giỏi kênh:</div>
        <div className="col-xl-12 grid-margin stretch-card">
          <Follow />
        </div>
      </div>
    </div>
  );
}
