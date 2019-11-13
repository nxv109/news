import React from "react";
import axios from "axios";

export default function Category({ match }) {
  const [highlightNew, setHighlightNew] = React.useState({});
  const [tags, setTags] = React.useState([]);
  const [newByTag, setNewByTag] = React.useState([]);
  const id = match.params.id;

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios(`/news/categories/${id}`);

      // function getDataByTag(tag) {
      //   return res.data.data.filter(item => item.tag.includes(tag));
      // }

      function getDataByView(view) {
        return res.data.data.find(item => item.view > view);
      }

      const highlightNew = getDataByView(9);
      // const newByTag = getDataByTag();

      // setTags(getTags());
      setHighlightNew(highlightNew);
      setNewByTag(res.data.data);

      let getTags = [];

      res.data.data.map(item => getTags.push(item.tag));

      console.log('tags', getTags);
    };
    

    fetchData();
  }, [id]);

  


  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div>
              <h3 className="mb-3">Tin tức nổi bật</h3>
              {highlightNew ? (
                <div className="featured-new p-3 bg-white rounded">
                  <div className="featured-new__image border border-secondary">
                    <img
                      src={`/uploads/news/${highlightNew.articlePicture}`}
                      alt={highlightNew.title}
                    />
                  </div>
                  <div className="featured-new__info">
                    <h3 className="featured-new__title">
                      {highlightNew.title}
                    </h3>
                  </div>
                </div>
              ) : null}
            </div>

            {/* {appState.news.data
              ? appState.news.data.map((item, index) => (
                  <div>
                    <h3 className="mb-3">Tin tức nổi bật</h3>
                    <div
                      key={index}
                      className="featured-new p-3 bg-white rounded"
                    >
                      <div className="featured-new__image border border-secondary">
                        <img
                          src={`/uploads/news/${item.articlePicture}`}
                          alt={item.title}
                        />
                      </div>
                      <div className="featured-new__info">
                        <h3 className="featured-new__title">{item.title}</h3>
                        <p className="featured-new__createby text-secondary">
                          Creator: {item.createdBy.username} | Time:{" "}
                          {item.dateCreate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : null} */}
          </div>
          <div className="col-lg-3">asdfsdf</div>
        </div>
      </div>
    </React.Fragment>
  );
}
