import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../actions/user.action";
import NavAdmin from "./NavAdmin";
import NavUser from "./NavUser";

const style = {
  transform: "translate(0px, -1px) scale(1.1)"
};

export default function Navbar() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();
  // const userId = sessionStorage.getItem("userId");
  const token = localStorage.getItem("auth-token") || "asdasd";

  // xác thực thêm cái token nữa

  React.useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const res = await axios.get(`/login/${token}`);
        const rs = await res.data.data;

        dispatch(addUser(rs));
      };

      fetchUser();
    }
  }, [dispatch, token]);

  return (
    <React.Fragment>
      {appState.users.data ? (
        appState.users.data.role === "customer" ? (<NavUser style={style} />) : (<NavAdmin role={appState.users.data.role} style={style} />)
      ) : (<NavUser style={style} />)}
    </React.Fragment>
  );
}
