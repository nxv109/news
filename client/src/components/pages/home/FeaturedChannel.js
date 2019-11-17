import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../../../actions/user.action";
import Loading from "../../Loading";

export default function FeaturedChannel() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="col-lg-2">
        <h3 className="mb-3">Kênh uy tín</h3>
        {appState.users.users
          ? appState.users.users.map((user, index) => (
              <Link
                to={`/channel/${user._id}`}
                key={index}
                className="channel p-1 bg-white rounded text-decoration-none text-dark"
              >
                <div className="channel__image">
                  <img
                    src={`/uploads/users/${user.image}`}
                    alt={user.username}
                  />
                </div>
                <div className="channel__info">
                  <h5 className="channel__title">{user.username}</h5>
                </div>
              </Link>
            ))
          : (<Loading />)}
      </div>
    </React.Fragment>
  );
}
