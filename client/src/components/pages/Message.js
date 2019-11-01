import React from "react";
import { useSelector } from "react-redux";

export default function Message() {
  const [msg, setMsg] = React.useState("");
  const appState = useSelector(state => state);

  React.useEffect(() => {
    if (appState.users.message) {
      setMsg(appState.users.message);
    }
  }, [appState.users.message]);

  return (
    <React.Fragment>
      {msg.code ? (
        <div
          className={`${
            msg.code === 200
              ? "alert alert-success text-center"
              : "alert alert-danger text-center"
          }`}
        >
          {msg.message}
        </div>
      ) : null}
    </React.Fragment>
  );
}
