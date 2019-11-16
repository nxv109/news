import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function NewsDetail(props) {
  const [ datas, setDatas ] = React.useState({});

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
          console.log("ok t se tang 1 view");

          const resIncreaseViews = await axios.put(`/news/views/${id}`, { views: props.datas.view + 1 });

          if (resIncreaseViews.data.data) {
            setDatas(resIncreaseViews.data.data[0]);
            console.log(resIncreaseViews.data.data[0]);
          }
        }
      };

      getIp();
    }

  }, [props.datas]);

  return(
    <React.Fragment>
      {
        datas
        ? (
          <div className="col-lg-8 p-2 bg-white rounded shadow-sm">
            <h1>{datas.title}</h1>
            {
              datas.createdBy
              ? (<p className="featured-new__createby text-secondary">Creator: {datas.createdBy.username} | Time: {datas.dateCreate} | <i className="mdi mdi-eye" /> {datas.view}</p>)
              : null
            }
            <div className="featured-new__image border border-secondary my-4">
              <img
                src={`/uploads/news/${datas.articlePicture}`}
                alt={datas.title}
              />
            </div>
            <div dangerouslySetInnerHTML={{__html: datas.content}}></div>
          </div>
        )
        : null
      }
    </React.Fragment>
  )
}
