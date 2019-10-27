import React from "react";
import axios from "axios";
import Message from "./components/Message";

export default function WithAuth(ComponentJournalist, ComponentEditor) {
  const [role, setRole] = React.useState("");
  const [msg, setMsg] = React.useState("Unauthorized: Bạn không được cấp phép vào trang này.");

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("auth-token") || "asdasd";
      const role = localStorage.getItem("role") || "not login";

      const res = await axios.post("/login/checkToken", {
        token: token,
        role: role
      });

      setRole(res.data.role);
    };

    fetchData();
  }, [setRole, setMsg]);

  return (
    <React.Fragment>
      {role === "editor" ? (
        <ComponentEditor />
      ) : role === "journalist" ? (
        <ComponentJournalist />
      ) : role === "customer" || role === "not login" ? (
        <Message message={msg} />
      ) : null}
    </React.Fragment>
  );
}
