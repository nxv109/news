import React from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/statisticals/news");

        setNews(res.data.data);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  console.log('news', news);

  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "0"];
  let rs = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

  // dem luot views cua tung tin tuc
  const countView = news.reduce((a, b) => {
    a[b['news']] = (++a[b['news']]) || 1;
    return a;
  }, {});

  const convertToArray = Object.entries(countView);

  console.log(convertToArray);

  let arr = [];
  news.map(v => {
    convertToArray.forEach(([key, value]) => {
      if (v.news === key) {
        arr.push({...v, views: value})
      }
    })

    return arr;
  });

  console.log("arr", arr);


  // set views theo thoi diem
  arr.map(v => {
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
        <p className="col-xl-12 grid-margin stretch-card font-weight-bold">Lượt views trong ngày:</p>
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
    </div>
  );
}
