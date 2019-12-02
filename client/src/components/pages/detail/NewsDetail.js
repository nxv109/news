import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import moment from "moment";
import Cookies from "js-cookie";

import BoxLoadingDetail from "../../BoxLoadingDetail";
import { setMessage } from "../../../actions/message.action";
import { closeMessage } from "../closeMessage";
import Message from "../Message";

export default function NewsDetail(props) {
    const [datas, setDatas] = React.useState({});
    const [comments, setComments] = React.useState([]);
    const [content, setContent] = React.useState([]);

    const dispatch = useDispatch();

    const userId = sessionStorage.getItem("userId");

    React.useEffect(() => {
        setDatas(props.datas);

        // increase views
        if (props.datas) {
            const id = props.datas._id;

            const getIp = async () => {
                const res = await axios.get("https://api.ipify.org/?format=json");
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

            const fetchComment = async () => {
                const res = await axios.get(`/comments/${id}`);

                setComments(res.data.data);
                console.log(res.data.data);
            };

            fetchComment()
            getIp();
        }
    }, [props.datas]);

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                newsId: props.datas._id,
                userId: userId,
                content: content
            };

            const res = await axios.post("/comments", data);
            setComments(res.data.data);
            setContent("");
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            const res = await axios.get(`/comments`, { params: { commentId: commentId, newsId: props.datas._id } });

            const { code, message, data } = res.data;

            dispatch(setMessage({ code, message }));
            dispatch(closeMessage({ code, message }));

            setComments(data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <React.Fragment>
          <Message />
          {datas ? (
            <div className="col-lg-8 col-md-8 p-2 bg-white rounded shadow-sm">
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
              ) : (<BoxLoadingDetail />)}
              <div className="text-justify" dangerouslySetInnerHTML={{ __html: datas.content }}></div>

              {
                userId
                ? (
                  <form onSubmit={handleSubmit} className="mt-5">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Nhận xét:</label>
                      <textarea name="comment" value={content || ""} onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows={3} />
                    </div>
                    <button className="btn btn-danger" type="submit">Gửi</button>
                  </form>
                )
                : (
                  <p className="text-danger">Nhận xét: <span className="text-muted">bạn cần đăng nhập để thực hiện chức năng này! <Link to="/login" className="text-info">login</Link></span></p>
                )
              }
              {
                comments
                ? comments.length > 0
                  ? 
                    comments.map((comment, index) => (
                      <div key={index} className="mt-3">
                        <p>{comment.content}</p>
                        <small>Nhận xét bởi: {comment.createdBy.username} - Vào lúc: {moment(comment.date).format("DD-MM-YYYY HH:mm")} {comment.createdBy._id === userId ? (<span className="badge badge-pill badge-dark cursor-pointer" onClick={() => handleDelete(comment._id)}>Xóa</span>) : null}</small>
                        <hr />
                      </div>
                    )
                  )
                  : (<p className="text-muted mt-3">Chưa có nhận xét nào!</p>)
                : null
              }
            </div>
          ) : null}
        </React.Fragment>
    );
}