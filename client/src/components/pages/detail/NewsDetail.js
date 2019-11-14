import React from "react";

export default function NewsDetail(props) {
  const [ datas, setDatas ] = React.useState({});

  React.useEffect(() => {
    setDatas(props.datas);

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
              ? (<p className="featured-new__createby text-secondary">Creator: {datas.createdBy.username} | Time: {datas.dateCreate}</p>)
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
