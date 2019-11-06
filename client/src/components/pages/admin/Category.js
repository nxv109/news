import React from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { setMessage } from "../../../actions/message.action";
import { useDispatch } from "react-redux";

import Message from "../Message";

export default function Category() {
  const [categories, setCategories] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));
    const fetchCategories = async () => {
      const res = await axios.get("/cateNews");
      const data = res.data.data;

      setCategories(data);
    };

    fetchCategories();
  }, [dispatch]);

  // delete category
  const hanldeDelete = async id => {
    const res = await axios.delete(`/cateNews/${id}`);

    const { code, message, data } = res.data;
    dispatch(setMessage({ code, message }));

    setCategories(data);
  };

  const columns = [
    {
      Header: "TÊN CATEGORY",
      accessor: "name",
      sortable: true
    },
    {
      Header: "ACTION",
      filterable: false,
      sortable: false,
      Cell: props => {
        return (
          <div>
            <button
              onClick={() => hanldeDelete(props.original._id)}
              type="button"
              className="btn btn-danger"
            >
              Xóa
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
        <div className="col-xl-12">
          <Message />
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
