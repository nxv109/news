import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { hanldeUrlPretty } from "../mixin/UrlPretty";

export default function Footer() {
  const appState = useSelector(state => state);

  const getLatest = React.useMemo(() => {
    if (appState.news.latest) {
      return appState.news.latest;
    }
  }, [appState.news.latest]);

  let latest = [];

  if (getLatest) {
    latest = getLatest.slice(0, 6);
  }

  const getFeatured = React.useMemo(() => {
    if (appState.news.data) {
      return appState.news.data;
    }
  }, [appState.news.data]);

  let featured = [];

  if (getFeatured) {
    featured = getFeatured.slice(0, 6);
  }

  const getOther = React.useMemo(() => {
    if (appState.news.other) {
      return appState.news.other;
    }
  }, [appState.news.other]);

  let other = [];

  if (getOther) {
    other = getOther.slice(0, 6);
  }

  return (
    <footer className="page-footer font-small indigo bg-dark text-white mt-7">
      {/* Footer Links */}
      <div className="container text-md-left">
        {/* Grid row */}
        <div className="row">
          {/* Grid column */}
          <div className="col-md-4 mx-auto">
            {/* Links */}
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Tin mới</h5>
            <ul>
              {
                latest
                  ? (
                    latest.map((item, index) => (
                      <li className="list-style-none text-secondary" key={index}>
                        <Link to={`/${hanldeUrlPretty(item.title)}/${item._id}`} className="text-secondary">
                          {item.title}
                        </Link>
                      </li>
                    ))
                  )
                  : "Loading..."
              }
            </ul>
          </div>
          {/* Grid column */}
          <hr className="clearfix w-100 d-md-none" />
          {/* Grid column */}
          <div className="col-md-4 mx-auto">
            {/* Links */}
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Nổi bật</h5>
            <ul>
              {
                featured
                  ? (
                    featured.map((item, index) => (
                      <li className="list-style-none text-secondary" key={index}>
                        <Link to={`/${hanldeUrlPretty(item.title)}/${item._id}`} className="text-secondary">
                          {item.title}
                        </Link>
                      </li>
                    ))
                  )
                  : "Loading..."
              }
            </ul>
          </div>
          {/* Grid column */}
          <hr className="clearfix w-100 d-md-none" />
          {/* Grid column */}
          <div className="col-md-4 mx-auto">
            {/* Links */}
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Nhiều hơn</h5>
            <ul>
              {
                other
                  ? (
                    other.map((item, index) => (
                      <li className="list-style-none text-secondary" key={index}>
                        <Link to={`/${hanldeUrlPretty(item.title)}/${item._id}`} className="text-secondary">
                          {item.title}
                        </Link>
                      </li>
                    ))
                  )
                  : "Loading..."
              }
            </ul>
          </div>
          {/* Grid column */}
          <hr className="clearfix w-100 d-md-none" />
          {/* Grid column */}
        </div>
        {/* Grid row */}
      </div>
      {/* Footer Links */}
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">CÔNG TY TRUYỀN THÔNG POLY</h5>
            <ul>
              <li className="list-style-none bg-dark border-0">
                <p><span className="font-weight-bold">ĐỊA CHỈ: </span>137 Nguyễn Thị Thập, Q.Liên Chiểu, TP.Đà Nẵng</p>
              </li>
              <li className="list-style-none bg-dark border-0">
                <p><span className="font-weight-bold">ĐIỆN THOẠI: </span>0337892690</p>
              </li>
              <li className="list-style-none bg-dark border-0">
                <p><span className="font-weight-bold">EMAIL: </span>contact@gmail.com</p>
              </li>
            </ul>
          </div>
          <div className="col-md-6 mx-auto">
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Fanpage</h5>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnxvdesigners%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=1732530280376802"
              width="100%"
              height={130}
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder={0}
              allow="encrypted-media"
              title="fanpage"
            />
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div style={{ background: "#435165" }} className="footer-copyright text-center py-3 text-white">
        © {moment().format("YYYY")} Copyright:
        <a href="https://fb.com/nguyenxuanvinh109">
          {" "}
          Bái Chàng Tron
        </a>
      </div>
    </footer>
  );
}
