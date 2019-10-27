import React from "react";
import axios from "axios";
import useForm from "react-hook-form";

import { useDispatch } from "react-redux";
import { addUser } from "../../../actions/user.action";

export default function Login({ history }) {
  const [codeMsg, setCodeMsg] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [user, setUser] = React.useState({});
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data, e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setUser({ ...user, [name]: target.type === "checkbox" ? setRemember(!remember) : value });

    try {
      const res = await axios.post("/login", data);
      
      setCodeMsg(res.data.code);
      setMsg(res.data.message);
      
      if (res.data.code === 200) {
        // luu token
        const tokenCode = res.data.token;
        localStorage.setItem('auth-token', tokenCode);

        // truyen user data vao global
        const { username, email, role, image, _id } = res.data.data.user;
        localStorage.setItem('role', role);
        sessionStorage.setItem('userName', username);
        sessionStorage.setItem("image", image);

        dispatch(addUser({ username, email, role, image, _id }));

        console.log(res.data.data.user);

        history.push('/');
      }
    } catch (error) {
      if (error) console.log("Have a problem", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {codeMsg === 401 ? (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      ) : codeMsg === 400 ? (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      ) : codeMsg === 200 ? (
        <div className="alert alert-success" role="alert">
          {msg}
        </div>
      ) : null}
      <div className="form-group">
        <input
          type="text"
          name="email"
          style={{ border: `${errors.email ? "1px solid red" : ""}` }}
          className="form-control"
          placeholder="Enter email..."
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
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
      <div className="form-check">
        <input
          type="checkbox"
          name="remember"
          className="form-check-input"
          id="exampleCheck1"
          ref={register}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Login
      </button>
    </form>
  );
}
