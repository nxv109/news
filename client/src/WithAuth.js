import React from "react";
import axios from "axios";
import Message from "./components/Message";

export default function WithAuth(
  ComponentJournalist,
  ComponentEditor,
  ComponentSensor,
  ComponentAdmin
) {
  const [role, setRole] = React.useState("asdasd");
  const msg = "Unauthorized: Bạn không được cấp phép vào trang này.";

  const token = localStorage.getItem("auth-token") || "asdasd";
  const userId = sessionStorage.getItem("userId");

  React.useEffect(() => {
    async function fetchData() {
      if (userId) {
        const getRole = await axios.get(`/login/${userId}`);
        const userRole = await getRole.data.data.role;

        if (token && userRole) {
          const checkToken = async () => {
            const res = await axios.post("/login/checkToken", {
              token: token,
              role: userRole
            });

            setRole(res.data.role);
          };

          checkToken();
        }
      } else {
        setRole(null);
      }
    }

    fetchData();
  }, [setRole, role, token, userId]);

  return (
    <React.Fragment>
      {role ? (
        role === "editor" ? (
          <ComponentEditor />
        ) : role === "journalist" ? (
          <ComponentJournalist />
        ) : role === "sensor" ? (
          <ComponentSensor />
        ) : role === "admin" ? (
          <ComponentAdmin />
        ) : role === "customer" || role === "not login" || role === "" || role === null ? (
          <Message message={msg} />
        ) : null
      ) : <Message message={msg} />}
    </React.Fragment>
  );
}
