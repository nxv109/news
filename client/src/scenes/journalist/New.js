import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { setMessage } from "../../actions/message.action";
import { useDispatch } from "react-redux";

import Notified from "../../components/Notified/";
import { closeMessage } from "../closeMessage";

export default function News() {
  const [news, setNews] = React.useState([]);
  const [amountTrash, setAmountTrash] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [notApproved, setNotApproved] = React.useState(0);
  const [notPublished, setNotPublished] = React.useState(0);
  const [published, setPublished] = React.useState(0);
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("userId");

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));
    const fetchNews = async () => {
      if (userId) {
        const res = await axios.get(`/news/${userId}`);
        const data = res.data.data;

        function getData(property) {
          const rs = data.filter(v => v.status === property);
          return rs;
        }

        const notApproved = getData("new");
        const notPublished = getData("edited");
        const published = getData("published");

        setNews(data);
        setTotal(data.length);
        setNotApproved(notApproved.length);
        setNotPublished(notPublished.length);
        setPublished(published.length);
      }
    };

    const fetchTrash = async () => {
      const res = await axios.get(`/news/trash/${userId}`);
      const data = res.data.data;

      if (data) {
        setAmountTrash(data.length);
      }
    };

    fetchNews();
    fetchTrash();
  }, [dispatch, userId]);

  // move to trash
  const hanldeMoveToTrash = async id => {
    const res = await axios.put(`/news/trash/${id}`);
    const { code, message, data } = res.data;

    const news = await data.filter(v => v.isDelete === false && v.createdBy._id === userId);
    const amountTrash = await data.filter(v => v.isDelete === true && v.createdBy._id === userId);

    setNews(news);
    setAmountTrash(amountTrash.length);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());
  };

  // bỏ nháp
  const handleGiveUpDraft = async (id) => {
    const res = await axios.put(`/news/giveUpDraft/${id}`);
    const { code, message, data } = res.data;

    const news = await data.filter(v => v.isDelete === false && v.createdBy === userId);

    setNews(news);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());
  };

  // save nháp
  const handleSaveDraft = async (id) => {
    const res = await axios.put(`/news/saveDraft/${id}`);
    const { code, message, data } = res.data;

    const news = await data.filter(v => v.isDelete === false && v.createdBy === userId);

    setNews(news);
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
      maxWidth: 200,
      className: "text-center",
      Cell: props => {
        return (
          <React.Fragment>
            <span
              className={
                props.original.status === "new"
                  ? "badge badge-secondary"
                  : props.original.status === "edited"
                  ? "badge badge-info"
                  : props.original.status === "draft"
                  ? "badge badge-dark"
                  : "badge badge-success"
              }
            >
              {props.original.status}
            </span>
            <br />
            {props.original.status === "draft" ? (
              <button onClick={() => handleGiveUpDraft(props.original._id)} className="btn btn-link">Xóa nháp</button>
            )
            : props.original.status === "new"
            ? <button onClick={() => handleSaveDraft(props.original._id)} className="btn btn-link">Lưu nháp</button>
            : null
            }
          </React.Fragment>
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
            <button
              type="button"
              className="btn btn-danger btn-sm"
              title="Bỏ bài viết"
              onClick={() => hanldeMoveToTrash(props.original._id)}
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
          News
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
          <Notified />
        </div>
        <div className="col-xl-12 stretch-card">
          <div className="border-bottom border-secondary text-center w-100">
            <Link to="/admin/trash" className="btn btn-link text-dark pl-0">
              <i className="mdi mdi-delete-variant" /> Trash
              <span className="badge badge-dark ml-1">{amountTrash}</span>
              <span className="sr-only">unread messages</span>
            </Link>
            <button className="btn btn-link text-dark pl-0 cursor">
              Tổng tin
              <span className="badge badge-danger ml-1">{total}</span>
              <span className="sr-only">unread messages</span>
            </button>
            <button className="btn btn-link text-dark pl-0 cursor">
              Tin chưa phê duyệt
              <span className="badge badge-secondary ml-1">{notApproved}</span>
              <span className="sr-only">unread messages</span>
            </button>
            <button className="btn btn-link text-dark pl-0 cursor">
              Tin chưa pushlish
              <span className="badge badge-info ml-1">{notPublished}</span>
              <span className="sr-only">unread messages</span>
            </button>
            <button className="btn btn-link text-dark pl-0 cursor">
              Tin đã pushlish
              <span className="badge badge-success ml-1">{published}</span>
              <span className="sr-only">unread messages</span>
            </button>
          </div>
        </div>
        <div className="col-xl-12 grid-margin stretch-card">
          <ReactTable
            columns={columns}
            data={news}
            filterable
            defaultPageSize={10}
            noDataText={"Please wait..."}
            className="table mt-3"
          />
        </div>
      </div>
    </div>
  );
}
