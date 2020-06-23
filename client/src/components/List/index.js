import React from "react";
import { Link } from "react-router-dom";
import { urlPretty, isEmptyArray } from "../../helpers";
import BoxLoadingItem from "../../components/BoxLoadingItem/";
import moment from "moment";

function List({ data, name }) {
  if (isEmptyArray(data)) return <BoxLoadingItem />;

  if (name === "latest_new") {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <Link
            to={`/${urlPretty(item.title)}/${item._id}`}
            key={index}
            className="latest-new p-1 bg-white rounded text-decoration-none text-dark"
          >
            <div className="latest-new__image">
              <img
                src={`/uploads/news/${item.articlePicture}`}
                alt={item.title}
              />
            </div>
            <div className="latest-new__info">
              <h5 className="latest-new__title">{item.title}</h5>
            </div>
          </Link>
        ))}
      </React.Fragment>
    );
  }

  if (name === "featured_new") {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <Link
            to={`/${urlPretty(item.title)}/${item._id}`}
            key={index}
            className="featured-new p-3 bg-white rounded text-decoration-none"
          >
            <div className="featured-new__image border border-secondary">
              <img
                src={`/uploads/news/${item.articlePicture}`}
                alt={item.title}
              />
            </div>
            <div className="featured-new__info">
              <h4 className="featured-new__title">{item.title}</h4>
              <p className="featured-new__createby text-secondary">
                <i className="mdi mdi-monitor" /> {item.createdBy.username} -{" "}
                <i className="mdi mdi-av-timer" />{" "}
                {moment(item.dateCreate).format("DD-MM-YYYY")} -{" "}
                <i className="mdi mdi-eye" /> {item.view}
              </p>
            </div>
          </Link>
        ))}
      </React.Fragment>
    );
  }

  if (name === "featured_chanel") {
    return (
      <React.Fragment>
        {data.map((user, index) => (
          <Link
            to={`/channel/${urlPretty(user.username)}/${user._id}`}
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
        ))}
      </React.Fragment>
    );
  }

  if (name === "new_for_you") {
    return (
      <React.Fragment>
        {data.map((item, index) => (
          <Link
            to={`/${urlPretty(item.title)}/${item._id}`}
            key={index}
            className="other-new p-3 bg-white rounded text-decoration-none"
          >
            <div className="other-new__image border border-secondary">
              <img
                src={`/uploads/news/${item.articlePicture}`}
                alt={item.title}
              />
            </div>
            <div className="other-new__info">
              <h4 className="other-new__title">{item.title}</h4>
              <p className="other-new__createby text-secondary">
                <i className="mdi mdi-monitor" /> {item.createdBy.username} -{" "}
                <i className="mdi mdi-av-timer" />{" "}
                {moment(item.dateCreate).format("DD-MM-YYYY")} -{" "}
                <i className="mdi mdi-eye" /> {item.view}
              </p>
            </div>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}

export default React.memo(List);
