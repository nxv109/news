import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function NewsOther(props) {
  const [tags, setTags] = React.useState([]);
  const [newByTag, setNewByTag] = React.useState([]);

  React.useEffect(() => {
    // xủ lý  tin tức trùng lặp
    if (props.newsHighlightId && props.newByTag) {
      const newByTag = props.newByTag.filter(v => v._id !== props.newsHighlightId);

      setNewByTag(newByTag);
    }

    // xủ lý tin tức có tags giống với tin tức nỗi bật
    if (props.highlightNew && props.tags) {
      const highlightNewTags = props.highlightNew.tag;

      if (highlightNewTags) {
        let tags = [];

        for (let j = 0; j < props.tags.length; j++) {
          for (let i = 0; i < highlightNewTags.length; i++) {
            if (props.tags[j] === highlightNewTags[i]) {
              tags.push(props.tags[j]);
            }
          }
        }

        // console.log("tags", tags);

        const rs = props.tags.filter(v => !tags.includes(v));

        setTags(rs);
      }
    }

  }, [props.tags, props.newByTag, props.newsHighlightId, props.highlightNew]);

  // just show news <= 50
  newByTag.length = 50;

  return(
    <React.Fragment>
      {
        tags
        ? (
          tags.map((tag, index) => (
            <div className="mt-5" key={index}>
              <h3 className="mb-3">{tag}</h3>
              {
                newByTag
                ? (
                  newByTag.map((item, index) => (
                    item.tag.includes(tag)
                    ? (
                      <Link to={`/${item._id}`} key={index} className="featured-new p-3 bg-white rounded text-decoration-none">
                        <div className="featured-new__image border border-secondary">
                          <img
                            src={`/uploads/news/${item.articlePicture}`}
                            alt={item.title}
                          />
                        </div>
                        <div className="featured-new__info">
                          <h3 className="featured-new__title">{item.title}</h3>
                          <p className="featured-new__createby text-secondary"><i className="mdi mdi-monitor" /> {item.createdBy.username} | <i className="mdi mdi-av-timer" /> {moment(item.dateCreate).format("DD-MM-YYYY")} | <i className="mdi mdi-eye" /> {item.view}</p>
                        </div>
                      </Link>
                    )
                    : null
                  ))
                )
                : null
              }
            </div>
          ))
        )
        : null
      }
    </React.Fragment>
  )
}
