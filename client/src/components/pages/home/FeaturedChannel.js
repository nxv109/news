import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../../../actions/user.action";
import BoxLoadingItem from "../../BoxLoadingItem";
import { hanldeUrlPretty } from "../../mixin/UrlPretty";

export default function FeaturedChannel() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
    
  }, [dispatch]);

  const users = React.useMemo(() => {
    return appState.users.users;
  }, [appState.users.users]);

  return (
    <React.Fragment>
      <div>
        <h3 className="mb-3">Kênh uy tín</h3>
        {users ? (
          users.map((user, index) => (
            <Link
              to={`/channel/${hanldeUrlPretty(user.username)}/${user._id}`}
              key={index}
              className="channel p-1 bg-white rounded text-decoration-none text-dark"
            >
              <div className="channel__image rounded-sm">
                <img src={`/uploads/users/${user.image}`} alt={user.username} />
              </div>
              <div className="channel__info">
                <h5 className="channel__title m-0">
                  {user.username.toUpperCase()}
                </h5>
                <p className="channel__follow text-secondary m-0">
                  Followers: {user.follow}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <BoxLoadingItem />
        )}
      </div>

      <div className="w-100 fanpage">
        <h3 className="mb-3 mt-4">Fanpage</h3>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnxvdesigners%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=1732530280376802"
          width="100%"
          height={130}
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder={0}
          allow="encrypted-media"
          title="fanpage"
        />
        <div className="mt-3">
          <img
            width="100%"
            src="/uploads/banners/YANNews_Banner.png"
            alt="banner"
          />
        </div>
      </div>
    </React.Fragment>
  );
}
