import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import BoxLoadingItem from "../../components/BoxLoadingItem/";
 import { urlPretty } from "../../helpers";

export default function NewsOther(props) {
  const [tags, setTags] = React.useState([]);
  const [newByTag, setNewByTag] = React.useState([]);

  React.useEffect(() => {
    // xủ lý  tin tức trùng lặp
    if (props.newsHighlightId && props.newByTag) {
      const newByTag = props.newByTag.filter(v => v._id !== props.newsHighlightId);

      setNewByTag(newByTag);
    } else {
      setNewByTag(props.newByTag);
      setTags(props.tags)
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
  // newByTag.length = 50;

  return(
    <React.Fragment>
      {
        tags
        ? (
          tags.map((tag, index) => (
            <div className="" key={index}>
              <h3 className="mb-3 mt-3">{tag}</h3>
              {
                newByTag
                ? (
                  newByTag.map((item, index) => (
                    item.tag.includes(tag)
                    ? (
                      <Link to={`/${urlPretty(item.title)}/${item._id}`} key={index} className="other-new p-3 bg-white rounded text-decoration-none">
                        <div className="other-new__image border border-secondary">
                          <img
                            src={`/uploads/news/${item.articlePicture}`}
                            alt={item.title}
                          />
                        </div>
                        <div className="other-new__info">
                          <h4 className="other-new__title">{item.title}</h4>
                          <p className="other-new__createby text-secondary"><i className="mdi mdi-monitor" /> {item.createdBy.username} - <i className="mdi mdi-av-timer" /> {moment(item.dateCreate).format("DD-MM-YYYY")} - <i className="mdi mdi-eye" /> {item.view}</p>
                        </div>
                      </Link>
                    )
                    : null
                  ))
                )
                : (<BoxLoadingItem />)
              }
            </div>
          ))
        )
        : null
      }
    </React.Fragment>
  )
}
