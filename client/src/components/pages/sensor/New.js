import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { setMessage } from "../../../actions/message.action";
import { useDispatch } from "react-redux";

import Message from "../Message";

export default function News() {
  const [news, setNews] = React.useState([]);
  const [amountNews, setAmountNews] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));
    const fetchNews = async () => {
      const res = await axios.get("/newsSensors");
      const data = res.data.data;

      setNews(data);
      setAmountNews(data.length);
    };

    fetchNews();
  }, [dispatch]);

  const columns = [
    {
      Header: "TÊN BÀI VIẾT",
      accessor: "title",
      sortable: true,
      filterable: true
    },
    {
      Header: "STATUS",
      accessor: "status",
      sortable: true,
      maxWidth: 200,
      className: "text-center",
      Cell: props => {
        return (
          <span
            className={
              props.original.status === "new"
                ? "badge badge-secondary"
                : props.original.status === "edited"
                ? "badge badge-info"
                : "badge badge-success"
            }
          >
            {props.original.status}
          </span>
        );
      }
    },
    {
      Header: "ACTION",
      filterable: false,
      sortable: false,
      maxWidth: 200,
      className: "text-center",
      Cell: props => {
        return (
          <div>
            <Link
              to={`/admin/new/${props.original._id}`}
              className="btn btn-warning btn-sm mr-1"
              title="Sửa bài viết"
            >
              <i className="mdi mdi-table-edit"></i>
            </Link>
          </div>
        );
      }
    }
  ];
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-danger text-white mr-2">
            <i className="mdi mdi-view-list" />
          </span>
          News needs approval
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
        <div className="col-xl-12 stretch-card">
          <div className="border-bottom border-secondary text-center w-100">
            <button className="btn btn-link text-dark pl-0 cursor">
              <i className="mdi mdi-table-edit" /> Tin cần edit/publish
              <span className="badge badge-info ml-1">{amountNews}</span>
              <span className="sr-only">unread messages</span>
            </button>
          </div>
        </div>
        <div className="col-xl-12">
          <Message />
        </div>
        <div className="col-xl-12 grid-margin stretch-card">
          <ReactTable
            columns={columns}
            data={news}
            filterable
            defaultPageSize={5}
            noDataText={"Please wait..."}
            className="table mt-3 text-center"
          />
        </div>
      </div>
    </div>
  );
}
