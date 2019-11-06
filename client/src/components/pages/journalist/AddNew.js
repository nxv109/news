import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useForm from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { setMessage } from "../../../actions/message.action";
import Message from "../Message";
import { closeMessage } from "../closeMessage";

export default function AddNew() {
  const { register, handleSubmit, errors } = useForm();
  const [content, setContent] = React.useState(null);
  const [tag, setTag] = React.useState("");
  const [tagAlready, setTagAlready] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));

    const fetchCategories = async () => {
      const res = await axios.get("/cateNews");
      const data = res.data.data;

      setCategories(data);
    };

    fetchCategories();
  }, [dispatch]);

  const hanldChangeTag = e => {
    setTag(e.target.value);
  };

  console.log(tags);

  const hanldAddTag = () => {
    if (tag === "" || tag === null) {
      setTagAlready("Bạn cần nhập tag");
    } else {
      const tagExist = tags.filter(v => v.toLowerCase() === tag.toLowerCase());

      if (tagExist.length > 0) {
        setTagAlready("Tag đã tồn tại");
      } else {
        setTags([...tags, tag]);
        setTagAlready("");
      }
    }

    console.log(tags);
  };

  const hanldChangeContent = content => {
    setContent(content);
  };

  const onSunmit = async data => {
    try {
      const dataNews = {
        title: data.title,
        category: data.category,
        content: content,
        tags: tags,
        createdBy: appState.users.data._id
      };

      console.log(dataNews);

      const res = await axios.post("/news", dataNews);
      const { code, message } = res.data;

      dispatch(setMessage({ code, message }));
      dispatch(closeMessage());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-danger text-white mr-2">
            <i className="mdi mdi-format-list-bulleted" />
          </span>
          Add news
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span />
              Overview
              <i className="mdi mdi-alert-circle-outline icon-sm text-danger align-middle" />
            </li>
          </ul>
        </nav>
      </div>
      <div className="row">
        <div className="col-xl-12 grid-margin">
          <form onSubmit={handleSubmit(onSunmit)} className="w-100">
            <Message />
            <div className="form-group">
              <input
                type="text"
                name="title"
                style={{ border: `${errors.email ? "1px solid red" : ""}` }}
                className="form-control"
                placeholder="Enter new title..."
                ref={register({ required: true })}
              />
              {errors.title && (
                <small className="text-danger">This field is required</small>
              )}
            </div>
            <CKEditor
              className="w-100 mb-2"
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              config={{
                ckfinder: {
                  uploadUrl: "/news/upload?command=QuickUpload&type=Files&responseType=json"
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                hanldChangeContent(data);
              }}
            />
            <div className="form-group">
              <select
                name="category"
                className="form-control"
                style={{ border: `${errors.category ? "1px solid red" : ""}` }}
                ref={register({ required: true })}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="tags"
                className="form-control"
                placeholder="Enter new tag..."
                value={tag || ""}
                onChange={hanldChangeTag}
              />
              <div className="mt-2">
                <u className="mr-2">Tags:</u>
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span className="badge badge-success mr-1" key={index}>
                      {tag}
                    </span>
                  ))
                ) : (
                  <small className="text-secondary">
                    Bài viết của bạn chưa có tags nào
                  </small>
                )}
              </div>
              {tagAlready ? (
                <div>
                  <small className="text-danger">{tagAlready}</small>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <button
                onClick={hanldAddTag}
                type="button"
                className="btn btn-danger"
              >
                Thêm tag
              </button>
            </div>
            <button type="submit" className="btn btn-danger mt-3">
              Gửi yêu cầu phê duyệt
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
