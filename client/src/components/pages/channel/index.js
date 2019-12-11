import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import NewsHighlight from "./NewsHighlight";
import NewsOther from "./NewsOther";
import FeaturedChannal from "../home/FeaturedChannel";
import LatestNew from "../home/LatestNew";

import { setMessage } from "../../../actions/message.action";
import { closeMessage } from "../closeMessage";
import Message from "../Message";

// check nguoi dung da follow kenh chua
function checkUserIsFollowing(userExist, id, data) {
  if (userExist && data) {
    const checkFollowing = data.find(v => v.followBy === userExist && v.channel === id);

    return checkFollowing;
  }
}

export default function Channel({ match }) {
  const [following, setFollowing] = React.useState({});
  const [highlightNew, setHighlightNew] = React.useState({});
  const [channel, setChannel] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [newByTag, setNewByTag] = React.useState([]);
  const id = match.params.id;
  const userExist = sessionStorage.getItem("userId");
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/news/users/${id}`);

      function getTags() {
        let tagArr = [];

        res.data.data.map(item => tagArr.push(item.tag));

        const newTagArr = tagArr.flat(1);

        const result = [...new Set(newTagArr)];
        return result;
      }

      function getDataByView(view) {
        return res.data.data.find(item => item.view > view);
      }

      const highlightNew = getDataByView(9);

      setTags(getTags());
      setHighlightNew(highlightNew);
      setNewByTag(res.data.data);
    };

    const fetchUser = async () => {
      const res = await axios.get(`/users/name/${id}`);

      setChannel(res.data.data[0]);
    };

    const fetchFollows = async () => {
      const res = await axios.get("/followers");
      const { data } = res.data;

      // check nguoi dung da follow kenh chua
      setFollowing(checkUserIsFollowing(userExist, id, data));
    };

    fetchUser();
    fetchFollows();
    fetchData();
  }, [id, userExist]);

  // UnFollow
  const hanldeUnFollow = (follow, userId, userFollowingId) => {
    let decreaseFollow = follow - 1;
    
    const decrease = async () => {
      const res = await axios.put(`/followers/decrease/${userId}`, {
        follow: decreaseFollow
      });
      const { code, message, data } = res.data;

      setFollowing(checkUserIsFollowing(userExist, id, data));
      dispatch(setMessage({ code, message }));
      dispatch(closeMessage({ code, message }));
    };

    const unFollow = () => {
      axios.delete(`/followers/${userFollowingId}`);
    };

    decrease();
    unFollow();
  };

  // Follow
  const hanldeFollow = (follow, userId) => {
    let increaseFollow = follow + 1;

    const increase = async () => {
      const res = await axios.put(`/followers/increase/${userId}`, {
        follow: increaseFollow
      });
      const { code, message, data } = res.data;

      // check nguoi dung da follow kenh chua
      setFollowing(checkUserIsFollowing(userExist, id, data));

      dispatch(setMessage({ code, message }));
      dispatch(closeMessage({ code, message }));
    };

    const followChannel = async () => {
      await axios.post("/followers/", {
        channel: userId,
        user: userExist
      });
    };

    increase();
    followChannel();
  };

  return (
    <React.Fragment>
      <Message />
      <div className="container">
        <div className="row mb-3" style={{ alignItems: "center" }}>
          <h1 className="mr-2">{channel.username}</h1>
          <div className="mb-2">
            {userExist ? (
              following ? (
                following.channel === channel._id &&
                following.followBy === userExist ? (
                  <span
                    onClick={() =>
                      hanldeUnFollow(channel.follow, channel._id, following._id)
                    }
                    className="badge badge-success cursor-pointer"
                  >
                    Following
                  </span>
                ) : (
                  <span
                    onClick={() => hanldeFollow(channel.follow, channel._id)}
                    className="badge badge-info cursor-pointer"
                  >
                    Follow
                  </span>
                )
              ) : (
                <span
                  onClick={() => hanldeFollow(channel.follow, channel._id)}
                  className="badge badge-info cursor-pointer"
                >
                  Follow
                </span>
              )
            ) : (
              <Link to="/login" className="badge badge-info">
                Follow
              </Link>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <NewsHighlight highlightNew={highlightNew ? highlightNew : null} />
            <NewsOther
              tags={tags}
              newByTag={newByTag}
              newsHighlightId={highlightNew ? highlightNew._id : null}
              highlightNew={highlightNew}
            />
          </div>
          <div className="col-lg-4">
            <FeaturedChannal />
            <div className="mt-4">
              <LatestNew />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
