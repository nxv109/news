import React from "react";
import moment from "moment";

export default function Footer() {

  return (
    <footer className="page-footer font-small indigo bg-dark text-white mt-7">
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
          Nguyễn Xuân Vĩnh
        </a>
      </div>
    </footer>
  );
}
