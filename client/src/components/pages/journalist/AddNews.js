import React from "react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddNews() {
  const [ content, setContent ] = React.useState();

  const hanldChange = (data, editor) => {
    console.log("aaa", data);
    axios.post('/news', data)
    .then(res => res.json())
    .then(res => console.log(res.data))
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-xl-12 grid-margin stretch-card">
          <CKEditor
            className="w-100"
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            config={{
              width: 100,
              image_previewText: "Image Preview",
              ckfinder: {
                uploadUrl: "/uploads/news?command=QuickUpload&type=Files&responseType=json",
                openerMethod: "popup",
                filebrowserWindowWidth: "500"
              }
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              hanldChange(data);
              console.log("onChange", editor);
            }}

            customConfigLoaded={
              (event, editor) => {
                console.log("onChange", editor)}
            }
          />
        </div>
      </div>
    </div>
  );
}
