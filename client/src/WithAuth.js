import React from "react";
import axios from "axios";
import Message from "./components/Message";

export default function WithAuth(ComponentJournalist, ComponentEditor, ComponentSensor, ComponentAdmin) {
  const [role, setRole] = React.useState("");
  const msg = "Unauthorized: Bạn không được cấp phép vào trang này.";
  
  const token = localStorage.getItem("auth-token") || "asdasd";
  const userId = sessionStorage.getItem("userId");

  React.useEffect(() => {
    async function fetchData() {
      const getRole = await axios.get(`/login/${userId}`);
      const role = await getRole.data.data.role;

      const checkToken = async () => {

        const res = await axios.post("/login/checkToken", {
          token: token,
          role: role
        });
  
        setRole(res.data.role);
      };
  
      checkToken();
    }

    fetchData();
  }, [setRole, role, token, userId]);

  return (
    <React.Fragment>
      {role === "editor" ? (
        <ComponentEditor />
      ) : role === "journalist" ? (
        <ComponentJournalist />
      ) : role === "sensor" ? (
        <ComponentSensor />
      ) : role === "admin" ? (
        <ComponentAdmin />
      ) : role === "customer" || role === "not login" ? (
        <Message message={msg} />
      ) : null}
    </React.Fragment>
  );
}
