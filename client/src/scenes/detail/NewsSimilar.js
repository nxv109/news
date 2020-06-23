import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import BoxLoadingItem from "../../components/BoxLoadingItem/";
 import { urlPretty } from "../../helpers";

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
      <h3 className="mb-3 mt-3">Tin tức tương tự</h3>
      {datas
        ? datas.map((data, index) => (
            <Link to={`/${urlPretty(data.title)}/${data._id}`} key={index} className="other-new p-3 bg-white rounded text-decoration-none">
              <div className="other-new__image border border-secondary">
                <img
                  src={`/uploads/news/${data.articlePicture}`}
                  alt={data.title}
                />
              </div>
              <div className="other-new__info">
                <h4 className="other-new__title">{data.title}</h4>
                <p className="other-new__createby text-secondary"><i className="mdi mdi-monitor" /> {data.createdBy.username} - <i className="mdi mdi-av-timer" /> {moment(data.dateCreate).format("DD-MM-YYYY")} - <i className="mdi mdi-eye" /> {data.view}</p>
              </div>
            </Link>
          ))
        : (<BoxLoadingItem />)}
    </div>
  )
}
