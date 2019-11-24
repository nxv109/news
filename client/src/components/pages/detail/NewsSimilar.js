import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import Loading from "../../Loading";

export default function NewsSimilar(props) {
  const [ datas, setDatas ] = React.useState([]);
  const id = props.id;

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/news/similar/${id}`);

      setDatas(res.data.data);
    };

    fetchData();
  }, [id]);

  return(
    <div className="col-lg-8 p-0">
      <h3 className="mb-3 mt-5">Tin tức tương tự</h3>
      {datas
        ? datas.map((data, index) => (
            <Link to={`/${data._id}`} key={index} className="featured-new p-3 bg-white rounded text-decoration-none">
              <div className="featured-new__image border border-secondary">
                <img
                  src={`/uploads/news/${data.articlePicture}`}
                  alt={data.title}
                />
              </div>
              <div className="featured-new__info">
                <h3 className="featured-new__title">{data.title}</h3>
                <p className="featured-new__createby text-secondary"><i className="mdi mdi-monitor" /> {data.createdBy.username} - <i className="mdi mdi-av-timer" /> {moment(data.dateCreate).format("DD-MM-YYYY")} - <i className="mdi mdi-eye" /> {data.view}</p>
              </div>
            </Link>
          ))
        : (<Loading />)}
    </div>
  )
}
