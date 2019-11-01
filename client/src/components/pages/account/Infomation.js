import React from "react";
import { useSelector } from "react-redux";

export default function Infomation() {
  const [ users, setUsers ] = React.useState("");
  const appState = useSelector(state => state);

  React.useEffect(() => {
    if (appState.users.data) {
      setUsers(appState.users.data);
    }
    
  }, [appState.users.data]);

  return (
    <ul className="list-group shadow">
      <li className="list-group-item text-muted">
        Infomations <i className="fa fa-dashboard fa-1x" />
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Name: </strong>
        </span>
        {users.username}
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Email: </strong>
        </span>
        {users.email}
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Role: </strong>
        </span>
        {users.role}
      </li>
    </ul>
  );
}
