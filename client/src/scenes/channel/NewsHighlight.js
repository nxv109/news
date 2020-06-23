import React from "react";
import { Link } from "react-router-dom";

import BoxLoadingItem from "../../components/BoxLoadingItem/";
 import { urlPretty } from "../../helpers";

export default function NewsHighlight(props) {
  const [highlightNew, setHighlightNew] = React.useState({});

  React.useEffect(() => {
    setHighlightNew(props.highlightNew);

  }, [props.highlightNew]);


  return(
    <div>
      <h3 className="mb-3">Tin tức nổi bật</h3>
      {highlightNew ? (
        <Link to={`/${highlightNew.title && urlPretty(highlightNew.title)}/${highlightNew._id}`} className="featured-new p-3 bg-white rounded text-decoration-none">
          {highlightNew.articlePicture ? (
            <div className="featured-new__image border border-secondary">
              <img
                src={`/uploads/news/${highlightNew.articlePicture}`}
                alt={highlightNew.title}
              />
            </div>
          ) : (
            (<BoxLoadingItem />)
          )}
          <div className="featured-new__info">
            <h4 className="featured-new__title">
              {highlightNew.title}
            </h4>
          </div>
        </Link>
      ) : (<p className="text-secondary">Không có tin tức nổi bật nào!</p>)}
    </div>
  )
}
