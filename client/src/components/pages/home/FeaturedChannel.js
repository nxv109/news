import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../../../actions/user.action";
import Loading from "../../Loading";
import { setMessage } from "../../../actions/message.action";
import { closeMessage } from "../closeMessage";
import Message from "../Message";

// check nguoi dung da follow kenh chua
function checkUserIsFollowing(userExist, data) {
  if (userExist && data) {
    const checkFollowing = data.find(v => v.followBy === userExist);

    return checkFollowing;
  }
}

export default function FeaturedChannel() {
  const [following, setFollowing] = React.useState({});
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  const userExist = sessionStorage.getItem("userId");

  React.useEffect(() => {
    dispatch(getUsers());

    const fetchFollows = async () => {
      const res = await axios.get("/followers");
      const { data } = res.data;

      // console.log("following", data);

      // check nguoi dung da follow kenh chua
      setFollowing(checkUserIsFollowing(userExist, data));
      // setFollowing(data);
    };

    fetchFollows();
  }, [dispatch, userExist]);

  // UnFollow
  const hanldeUnFollow = (follow, userId, userFollowingId) => {
    console.log("unFollow", follow - 1);

    let decreaseFollow = follow - 1;
    const decrease = async () => {
      const res = await axios.put(`/followers/decrease/${userId}`, {
        follow: decreaseFollow
      });
      const { code, message } = res.data;

      setFollowing({});
      dispatch(setMessage({ code, message }));
      dispatch(closeMessage({ code, message }));
      dispatch(getUsers());
    };

    const unFollow = async () => {
      const res = await axios.delete(`/followers/${userFollowingId}`);

      dispatch(getUsers());
    };

    decrease();
    unFollow();
  };

  // Follow
  const hanldeFollow = (follow, userId) => {
    console.log("Follow", follow + 1);

    let increaseFollow = follow + 1;
    const increase = async () => {
      const res = await axios.put(`/followers/increase/${userId}`, {
        follow: increaseFollow
      });
      const { code, message, data } = res.data;

      // check nguoi dung da follow kenh chua
      setFollowing(checkUserIsFollowing(userExist, data));
      // setFollowing(data);

      dispatch(setMessage({ code, message }));
      dispatch(closeMessage({ code, message }));
      dispatch(getUsers());
    };

    const followChannel = async () => {
      const res = await axios.post("/followers/", {
        channel: userId,
        user: userExist
      });

      dispatch(getUsers());
    };

    increase();
    followChannel();
  };

  const users = React.useMemo(() => {
    return appState.users.users;
  }, [appState.users.users]);

  return (
    <React.Fragment>
      <div>
        <Message />
        <h3 className="mb-3">Kênh uy tín</h3>
        {users ? (
          users.map((user, index) => (
            <div
              to={`/channel/${user._id}`}
              key={index}
              className="channel p-1 bg-white rounded text-decoration-none text-dark"
            >
              <div className="channel__descriptions rounded p-2 border border-danger">
                <div>
                  {userExist ? (
                    following.followBy === userExist && following.channel === user._id
                    ? (<button onClick={() => hanldeUnFollow(user.follow, user._id, following._id)} type="button" className="btn btn-success p-1 mb-2">Following</button>)
                    : (<button onClick={() => hanldeFollow(user.follow, user._id)} type="button" className="btn btn-outline-success p-1 mb-2">Follow</button>)
                  ) : (
                    <Link to="/login" className="font-weight-light mb-2">
                      Follow
                    </Link>
                  )}
                </div>
                <div>
                  <Link to={`/channel/${user._id}`}>Xem kênh</Link>
                </div>
              </div>
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
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>

      <div id="sticky" className="w-100">
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
