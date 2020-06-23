import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { setMessage } from "../../actions/message.action";
import { useDispatch } from "react-redux";

import Notified from "../../components/Notified/";
import { closeMessage } from "../closeMessage";

export default function Category() {
  const [categories, setCategories] = React.useState([]);
  const [amountCategory, setAmountCategory] = React.useState(0);
  const [amountTrash, setAmountTrash] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));
    const fetchCategories = async () => {
      const res = await axios.get("/cateNews");
      const data = res.data.data;

      setCategories(data);
      setAmountCategory(data.length);
    };

    const fetchTrash = async () => {
      const res = await axios.get("/cateNews/trash");
      const data = res.data.data;

      setAmountTrash(data.length);
    };

    fetchCategories();
    fetchTrash();
  }, [dispatch]);

  // move to trash
  const hanldeTrash = async id => {
    const res = await axios.put(`/cateNews/trash/${id}`);
    const { code, message, data } = res.data;
    const categories = await data.filter(v => v.isDelete === false);
    const amountTrash = await data.filter(v => v.isDelete === true);

    setAmountTrash(amountTrash.length);
    dispatch(setMessage({ code, message }));
    dispatch(closeMessage());

    setCategories(categories);
  };

  const columns = [
    {
      Header: "TÊN",
      accessor: "name",
      sortable: true,
      className: "text-left"
    },
    {
      Header: "ACTION",
      filterable: false,
      sortable: false,
      maxWidth: 200,
      Cell: props => {
        return (
          <div>
            <button
              onClick={() => hanldeTrash(props.original._id)}
              type="button"
              className="btn btn-danger btn-sm"
              title="Bỏ chuyên mục"
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
            <i className="mdi mdi-format-list-bulleted" />
          </span>
          Categories
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
            <Link to="/admin/trash" className="btn btn-link text-dark pl-0">
              <i className="mdi mdi-delete-variant" /> Trash
              <span className="badge badge-secondary ml-1">{amountTrash}</span>
              <span className="sr-only">unread messages</span>
            </Link>
            <button className="btn btn-link text-dark pl-0 cursor">
              <i className="mdi mdi-table-edit" /> Số lượng category
              <span className="badge badge-secondary ml-1">
                {amountCategory}
              </span>
              <span className="sr-only">unread messages</span>
            </button>
          </div>
        </div>
        <div className="col-xl-12">
          <Notified />
        </div>
        <div className="col-xl-12 grid-margin stretch-card w-100">
          <ReactTable
            columns={columns}
            data={categories}
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
