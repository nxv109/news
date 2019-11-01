import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setMessage } from "../../../actions/user.action";

export default function Infomation() {
  const [users, setUsers] = React.useState("");
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (appState.users.data) {
      setUsers(appState.users.data);
    }
  }, [appState.users.data]);

  const hanldeChangeUpload = async e => {
    const formData = new FormData();
    await formData.append("file", e.target.files[0]);
    try {
      const res = await axios.put(`/login/uploadAvatar/${users._id}`, formData);
      const { username, email, role, image, _id } = res.data.data;
      const { code, message } = res.data;

      dispatch(addUser({ username, email, role, image, _id }));
      dispatch(setMessage({ code, message }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center shadow rounded p-1">
      <img
        src={`/uploads/${users.image || "avatar-default.jpg"}`}
        className="avatar img-circle img-thumbnail"
        alt="avatar"
      />
      <h6>Change Avatar...</h6>
      <div className="custom-file mb-3">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          name="filename"
          onChange={hanldeChangeUpload}
        />
        <label className="custom-file-label" htmlFor="customFile">
          Choose file
        </label>
      </div>
    </div>
  );
}
