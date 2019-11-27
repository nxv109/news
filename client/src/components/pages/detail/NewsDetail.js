import React from "react";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";

import Loading from "../../Loading";

export default function NewsDetail(props) {
  const [datas, setDatas] = React.useState({});

  React.useEffect(() => {
    setDatas(props.datas);

    // increase views
    if (props.datas) {
      const getIp = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        const id = props.datas._id;
        const ipExist = Cookies.get(`ip${id}`);

        if (ipExist) {
          return;
        } else {
          Cookies.set(`ip${id}`, `${res.data.ip}-/${id}`, { expires: 1 });

          const resIncreaseViews = await axios.put(`/news/views/${id}`, {
            views: props.datas.view + 1
          });

          // thống kê lượt xem
          axios.post("/statisticals/news", { id: id });

          if (resIncreaseViews.data.data) {
            setDatas(resIncreaseViews.data.data[0]);
          }
        }
      };

      getIp();
    }
  }, [props.datas]);

  return (
    <React.Fragment>
      {datas ? (
        <div className="col-lg-8 p-2 bg-white rounded shadow-sm">
          <h1>{datas.title}</h1>
          {datas.createdBy ? (
            <p className="featured-new__createby text-secondary">
              <i className="mdi mdi-monitor" /> {datas.createdBy.username} | <i className="mdi mdi-av-timer" />{" "}
              {moment(datas.dateCreate).format("DD-MM-YYYY")} |{" "}
              <i className="mdi mdi-eye" /> {datas.view}
            </p>
          ) : null}
          {datas.articlePicture ? (
            <div className="border border-secondary my-4" style={{ overflow: "hidden" }}>
              <img
                src={`/uploads/news/${datas.articlePicture}`}
                alt={datas.title}
                width="100%"
              />
            </div>
          ) : (<Loading />)}
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: datas.content }}></div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
