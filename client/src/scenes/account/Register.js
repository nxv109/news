import React from "react";
import {Helmet} from 'react-helmet'
import useForm from "react-hook-form";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default function Register({ history }) {
  const [msg, setMsg] = React.useState("");
  const [showMsg, setShowMsg] = React.useState("");
  const { register, handleSubmit, errors } = useForm();

  const token = localStorage.getItem("auth-token");

  React.useEffect(() => {
    setShowMsg(msg);
  }, [msg]);

  const onSubmit = async data => {
    if (data.passwordAgain !== data.password) {
      setMsg("Mật khẩu không khớp");
    } else {
      const formData = new FormData();

      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("password", data.password);

      try {
        const res = await axios.post("/login/register", formData, {
          header: { "Content-Type": "multipart/form-data" }
        });

        const rs = res.data;
        setMsg(rs.message);
      } catch (error) {
        if (error) console.log("Have a problem with your request", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Đăng ký - BNews kênh tin tức hàng đầu Việt Nam</title>
        <meta name="description" content="BNews kênh tin tức hàng đầu Việt Nam, thời dự, bóng đá, tin trong ngày, giải trí, bất động sản,..." />
      </Helmet>
      {
        !token
        ? (
          <div className="container">
            <div className="row" style={{ height: "85vh" }}>
              <form className="col-xl-6 m-auto" onSubmit={handleSubmit(onSubmit)}>
                {msg === "Bạn đã đăng ký thành công" ? (
                  <div className="alert alert-success" role="alert">
                    {showMsg} <Link to="/login">Login</Link>
                  </div>
                ) : msg === "Người dùng đã tồn tại" ? (
                  <div className="alert alert-danger" role="alert">
                    {showMsg}
                  </div>
                ) : msg === "Mật khẩu không khớp" ? (
                  <div className="alert alert-danger" role="alert">
                    {showMsg}
                  </div>
                ) : null}
                <h1 className="mb-4">ĐĂNG KÝ</h1>
                <div className="form-group">
                  <input
                    type="text"
                    name="userName"
                    style={{ border: `${errors.userName ? "1px solid red" : ""}` }}
                    className="form-control"
                    placeholder="Enter your name..."
                    ref={register({ required: true })}
                  />
                  {errors.userName && (
                    <small className="text-danger">This field is required</small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    style={{ border: `${errors.email ? "1px solid red" : ""}` }}
                    className="form-control"
                    placeholder="Enter email..."
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                  {errors.email && (
                    <small className="text-danger">
                      This field is required and that is an email address match (ex:
                      example123@gmail.com)
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    style={{ border: `${errors.password ? "1px solid red" : ""}` }}
                    className="form-control"
                    placeholder="Enter password..."
                    ref={register({ required: true })}
                  />
                  {errors.password && (
                    <small className="text-danger">This field is required</small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="passwordAgain"
                    style={{ border: `${errors.password ? "1px solid red" : ""}` }}
                    className="form-control"
                    placeholder="Enter password again..."
                    ref={register({ required: true })}
                  />
                  {errors.passwordAgain && (
                    <small className="text-danger">This field is required</small>
                  )}
                </div>
                <button type="submit" className="btn btn-danger mt-3">
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        )
        : <Redirect to="/" />
      }
    </>
  );
}
