import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "../../Loading";

export default function AdditionalNew() {
  const [ newsReel, setNewsReel ] = React.useState([]);
  const [ newsEntertainment, setNewsEntertainment ] = React.useState([]);

  React.useEffect(() => {
    const fetchNewsReelData = async () => {
      const res = await axios.get('/news/newsReels', { params: { newsId: "5dbe935fd84e1413ac50c2bc" } });
      const { data } = res.data;

      setNewsReel(data);
    };

    const fetchNewsEntertainmentData = async () => {
      const res = await axios.get('/news/newsEntertainments', { params: { newsId: "5dd4e90432e5ba1e1770a95f" } });
      const { data } = res.data;

      setNewsEntertainment(data);
    };

    fetchNewsReelData();
    fetchNewsEntertainmentData();
  }, []);

  return (
    <React.Fragment>
      <div className="col-lg-6">
        <h3 className="mb-3">Thời sự</h3>
        <div className="card-columns">
          {
            newsReel ?
              (
                newsReel.map((item, index) => (
                  <Link to={`/${item._id}`} key={index} className="card text-decoration-none hover-sm">
                    <div className="selected-news"><img src={`/uploads/news/${item.articlePicture}`} className="card-img-top" alt={item.title} /></div>
                    <div className="card-body p-1">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <small className="text-muted"><i className="mdi mdi-monitor" /> {item.createdBy.username}</small>
                      </p>
                    </div>
                  </Link>
                ))
              )
            : (<Loading />)
          }
        </div>
      </div>
      <div className="col-lg-6">
        <h3 className="mb-3">Giải trí</h3>
        <div className="card-columns">
          {
            newsEntertainment ?
              (
                newsEntertainment.map((item, index) => (
                  <Link to={`/${item._id}`} key={index} className="card text-decoration-none hover-sm">
                    <div className="selected-news"><img src={`/uploads/news/${item.articlePicture}`} className="card-img-top" alt={item.title} /></div>
                    <div className="card-body p-1">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <small className="text-muted"><i className="mdi mdi-monitor" /> {item.createdBy.username}</small>
                      </p>
                    </div>
                  </Link>
                ))
              )
            : null
          }
        </div>
      </div>
    </React.Fragment>
  );
}
