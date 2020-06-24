import React from "react";
import { Link } from "react-router-dom";

import BoxLoadingItem from "../../components/BoxLoadingItem/";
 import { urlPretty, isEmptyObject } from "../../helpers";

export default function NewsHighlight(props) {
  const [highlightNew, setHighlightNew] = React.useState({});

  React.useEffect(() => {
    setHighlightNew(props.highlightNew);
    
  }, [props.highlightNew]);

  if (isEmptyObject(highlightNew)) return (<BoxLoadingItem number={8} />);

  return (
    <div>
      <h3 className="mb-3">Tin tức nổi bật</h3>
        <Link
          to={`/${highlightNew.title && urlPretty(highlightNew.title)}/${highlightNew._id}`}
          className="featured-new p-3 bg-white rounded text-decoration-none"
        >
            <div className="featured-new__image border border-secondary">
              <img
                src={`/uploads/news/${highlightNew.articlePicture}`}
                alt={highlightNew.title}
              />
            </div>
          <div className="featured-new__info">
            <h4 className="featured-new__title">{highlightNew.title}</h4>
          </div>
        </Link>
    </div>
  );
}
