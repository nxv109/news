import React from "react";
import useForm from "react-hook-form";
import axios from "axios";

export default function Register({ history }) {
  const [msg, setMsg] = React.useState("");
  const [showMsg, setShowMsg] = React.useState("");
  const { register, handleSubmit, errors } = useForm();

  React.useEffect(() => {
    setShowMsg(msg);
  }, [msg]);

  const onSubmit = async data => {
    const formData = new FormData();

    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("file", data.file[0]);

    try {
      const res = await axios.post("/login/register", formData, {
        header: { "Content-Type": "multipart/form-data" }
      });

      const rs = res.data;
      setMsg(rs.message);

      if (msg === "Bạn đã đăng ký thành công") {
        history.push('/login')
      }
    } catch (error) {
      if (error) console.log("Have a problem with your request", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        msg === "Bạn đã đăng ký thành công"
        ? (
          <div className="alert alert-success" role="alert">
           {showMsg}
          </div>
        )
        : msg === "Người dùng đã tồn tại"
        ? (
          <div className="alert alert-danger" role="alert">
           {showMsg}
          </div>
        )
        : null
      }
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
          placeholder="Password..."
          ref={register({ required: true })}
        />
        {errors.password && (
          <small className="text-danger">This field is required</small>
        )}
      </div>
      <div className="custom-file">
        <input
          type="file"
          name="file"
          style={{ border: `${errors.file ? "1px solid red" : ""}` }}
          className="custom-file-input"
          id="validatedCustomFile"
          ref={register({ required: true })}
        />
        <label className="custom-file-label" htmlFor="validatedCustomFile">
          Choose file...
        </label>
        <div className="invalid-feedback">
          Example invalid custom file feedback
        </div>
        {errors.file && (
          <small className="text-danger">This field is required</small>
        )}
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Register
      </button>
    </form>
  );
}
