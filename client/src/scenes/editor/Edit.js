import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { setMessage } from "../../actions/message.action";
import Notified from "../../components/Notified/";
import { closeMessage } from "../closeMessage";

export default function Edit({ match }) {
  const [content, setContent] = React.useState(null);
  const [tagAlready, setTagAlready] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [newData, setNewData] = React.useState([]);
  const [news, setNews] = React.useState({});

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));

    const fetchCategories = async () => {
      const res = await axios.get("/cateNews");
      const data = res.data.data;

      setCategories(data);
    };

    const fetchNew = async () => {
      const res = await axios.get(`/news/new/${match.params.id}`);
      const data = res.data.data[0];

      setNewData(data);
      setTags(data.tag);
    };

    fetchCategories();
    fetchNew();
  }, [dispatch, match.params.id]);

  const handleChange = e => {
    setNews({ ...news, [e.target.name]: e.target.value});
  };

  const hanldAddTag = () => {
    if (news.tag === "") {
      setTagAlready("Bạn cần nhập tag");
    } else {
      const tagExist = tags.filter(v => v.toLowerCase() === news.tag.toLowerCase());

      if (tagExist.length > 0) {
        setTagAlready("Tag đã tồn tại");
      } else {
        setTags([...tags, news.tag]);
        setTagAlready("");
      }
    }
  };

  // remove tag
  const hanldeRemoveTag = (index) => {
    const newTag = [ ...tags ];
    newTag.splice(index, 1);

    setTags(newTag);
  };

  const hanldChangeContent = content => {
    setContent(content);
  };

  const hanldeChangeUpload = e => {
    setFile(e.target.files[0]);
  };

  const hanldeSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('title', news.title || newData.title);
      formData.append('categoryId', news.category || newData.cateNews._id);
      formData.append('content', content || newData.content);
      formData.append('tags', JSON.stringify(tags));
      formData.append("file", file || newData.articlePicture);

      const res = await axios.put(`/newsEdits/${match.params.id}`, formData);
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
          Edit
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
          <form onSubmit={hanldeSubmit} className="w-100">
            <Notified />
            <div className="form-group">
              <label>Tiêu đề:</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter new title..."
                value={news.title || newData.title || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Nội dung:</label>
              <CKEditor
                className="w-100 mb-2"
                editor={ClassicEditor}
                data={newData.content}
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
            </div>
            <div className="form-group">
              <label>Thể loại:</label>
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
              >
                <option value={newData.cateNews ? newData.cateNews._id : null}>>{newData.cateNews ? newData.cateNews.name : null}</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Tags:</label>
              <input
                type="text"
                name="tag"
                className="form-control"
                placeholder="Enter new tag..."
                value={news.tag || ""}
                onChange={handleChange}
              />
              <div className="mt-2">
                <u className="mr-2">Tags:</u>
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span className="badge badge-success mr-1 tag" key={index}>
                      {tag}
                      <i onClick={() => hanldeRemoveTag(index)} className="mdi mdi-close-circle-outline tag__close text-dangder" />
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
                className="btn btn-danger btn-sm"
              >
                Thêm tag
              </button>
            </div>
            <div className="form-group">
              <label>Ảnh đại diện:</label>
              <div className="custom-file mb-3">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  name="filename"
                  onChange={hanldeChangeUpload}
                />
                <label style={{ height: "calc(1.5em + 0.75rem + 0px)" }} className="custom-file-label bd-none bdr-none" htmlFor="customFile">
                  Choose file
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-danger">
              YÊU CẦU PHÊ DUYỆT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
