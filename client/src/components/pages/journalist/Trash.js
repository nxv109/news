import React from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { setMessage } from "../../../actions/message.action";
import { useDispatch } from "react-redux";

import Message from "../Message";
import { closeMessage } from "../closeMessage";

export default function Trash() {
  const [news, setNews] = React.useState([]);
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("userId");

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));
    const fetchNews = async () => {
      const res = await axios.get(`/news/trash/${userId}`);
      const data = res.data.data;

      setNews(data);
    };

    fetchNews();
  }, [dispatch, userId]);

  // delete
  const hanldeDelete = async id => {
    const res = await axios.delete(`/news/${id}`);
    const { code, message, data } = res.data;

    const drafts = await data.filter(v => v.isDelete === true && v.createdBy._id === userId);

    setNews(drafts);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());
  };

  // restore
  const hanldeRestore = async id => {
    const res = await axios.put(`/news/restore/${id}`);
    const { code, message, data } = res.data;

    const drafts = await data.filter(v => v.isDelete === true && v.createdBy._id === userId);

    setNews(drafts);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());
  };

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
      className: "text-center",
      maxWidth: 200,
      Cell: props => {
        return (
          <span
            className="badge badge-dark"
          >
            {props.original.status}
          </span>
        )
      }
    },
    {
      Header: "ACTION",
      filterable: false,
      sortable: false,
      className: "text-center",
      maxWidth: 200,
      Cell: props => {
        return (
          <div>
            <button
              type="button"
              className="btn btn-warning btn-sm mr-1"
              title="Restore bài viết"
              onClick={() => hanldeRestore(props.original._id)}
            >
              <i className="mdi mdi-backup-restore"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              title="Xóa bài viết"
              onClick={() => hanldeDelete(props.original._id)}
            >
              <i className="mdi mdi-delete"></i>
            </button>
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
          Trash
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
            className="table mt-3"
          />
        </div>
      </div>
    </div>
  );
}
