import React from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { setMessage } from "../../../actions/message.action";
import { useDispatch } from "react-redux";

import Message from "../Message";
import { closeMessage } from "../closeMessage";

export default function Member() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));
    const fetchUsers = async () => {
      const res = await axios.get("/users");
      const data = res.data.data;

      setUsers(data);
    };

    fetchUsers();
  }, [dispatch]);

  const handleChangeRole = (id, value) => {
    users.filter(async (user, index) => {
      if (user._id === id) {
        const res = await axios.put(`/users/updateRole/${id}`, { role: value });
        const { code, message, data } = res.data;

        setUsers(data);
        dispatch(setMessage({ code, message }));
        dispatch(closeMessage());
      }
    });
  };

  // locked user
  const handleLockUser = (id, isDelete) => {
    users.filter(async (user, index) => {
      if (user._id === id) {
        const res = await axios.post(`/users/locked/${id}`, {
          isDelete: !isDelete
        });
        const { code, message, data } = res.data;

        setUsers(data);
        dispatch(setMessage({ code, message }));
        dispatch(closeMessage());
      }
    });
  };

  // delete user
  const handleDeleteUser = id => {
    users.filter(async (user, index) => {
      if (user._id === id) {
        const res = await axios.delete(`/users/${id}`);
        const { code, message, data } = res.data;

        setUsers(data);
        dispatch(setMessage({ code, message }));
        dispatch(closeMessage());
      }
    });
  }

  const columns = [
    {
      Header: "AVATAR",
      accessor: "image",
      sortable: false,
      filterable: false,
      maxWidth: 100,
      maxHeight: 100,
      Cell: props => {
        return (
          <div
            style={{
              maxHeight: "100px",
              width: "100%",
              overflow: "hidden"
            }}
          >
            <img
              src={`/uploads/users/${props.original.image}`}
              style={{ maxWidth: "100%", transform: "scale(1.5)" }}
              alt="avatar"
            />
          </div>
        );
      }
    },
    {
      Header: "TÊN",
      accessor: "username",
      sortable: true
    },
    {
      Header: "EMAIL",
      accessor: "email",
      sortable: true
    },
    {
      Header: "ROLE",
      filterable: false,
      sortable: false,
      Cell: props => {
        return (
          <React.Fragment>
            <div className="form-group">
              <span className="d-inline-block">
                <select
                  name="role"
                  className="form-control"
                  onChange={e =>
                    handleChangeRole(props.original._id, e.target.value)
                  }
                >
                  <option defaultValue={props.original.role}>
                    {props.original.role}
                  </option>
                  <option value="admin">admin</option>
                  <option value="sensor">sensor</option>
                  <option value="editor">editor</option>
                  <option value="journalist">journalist</option>
                  <option value="customer">customer</option>
                </select>
              </span>
              {props.original.isDelete ? (
                <i className="mdi mdi-account-off text-danger"></i>
              ) : (
                <i className="mdi mdi-account-check text-success"></i>
              )}
            </div>
          </React.Fragment>
        );
      }
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
              onClick={() =>
                handleLockUser(props.original._id, props.original.isDelete)
              }
              type="button"
              className={
                props.original.isDelete
                  ? "btn btn-success btn-sm mr-1"
                  : "btn btn-warning btn-sm mr-1"
              }
              title={
                props.original.isDelete ? "Mở khóa tài khoản" : "Khóa tài khoản"
              }
            >
              {props.original.isDelete ? (
                <i className="mdi mdi-account-check"></i>
              ) : (
                <i className="mdi mdi-account-off"></i>
              )}
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              title="Xóa tài khoản"
              onClick={() => handleDeleteUser(props.original._id)}
            >
              <i className="mdi mdi-account-remove"></i>
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
            <i className="mdi mdi-account" />
          </span>
          Manager members
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
            data={users}
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
