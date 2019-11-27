import React from "react";
import axios from "axios";

import NewsHighlight from "./NewsHighlight";
import NewsOther from "./NewsOther";
import FeaturedChannel from "../home/FeaturedChannel";
import LatestNew from "../home/LatestNew";

export default function Category({ match }) {
  const [highlightNew, setHighlightNew] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const [newByTag, setNewByTag] = React.useState([]);
  const id = match.params.id;

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/news/categories/${id}`);

      function getTags() {
        let tagArr = [];

        res.data.data.map(item => tagArr.push(item.tag));

        const newTagArr = tagArr.flat(1);

        const result = [ ...new Set(newTagArr) ];
        return result;
      }

      function getDataByView(view) {
        return res.data.data.find(item => item.view > view);
      }

      const highlightNew = getDataByView(9);

      setTags(getTags());
      setHighlightNew(highlightNew);
      setNewByTag(res.data.data)
    };

    fetchData();
  }, [id]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <NewsHighlight highlightNew={highlightNew} />
            {
              highlightNew
              ? (<NewsOther tags={tags} newByTag={newByTag} newsHighlightId={highlightNew._id} highlightNew={highlightNew} />)
              : null
            }
          </div>
          <div className="col-lg-4">
            <div className="mb-4">
              <LatestNew />
            </div>
            <FeaturedChannel />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
