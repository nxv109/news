import React from "react";
import { useSelector } from "react-redux";

export default function Message() {
  const [msg, setMsg] = React.useState("");
  const appState = useSelector(state => state);

  React.useEffect(() => {
    if (appState.message.message) {
      setMsg(appState.message.message);
    }
  }, [appState.message.message]);

  return (
    <React.Fragment>
      {msg.code ? (
        <div
          className={`${
            msg.code === 200
              ? "alert alert-success text-center alert--lb alert-dismissible fade show shadow"
              : "alert alert-danger text-center alert--lb alert-dismissible fade show shadow"
          }`}
          role="alert"
        >
          <strong>{msg.message}</strong>
        </div>
      ) : null}
    </React.Fragment>
  );
}
