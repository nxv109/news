import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../../actions/user.action";

import List from '../../components/List';

export default function FeaturedChannel() {
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
    
  }, [dispatch]);

  const users = React.useMemo(() => {
    return appState.users.users || [];
  }, [appState.users.users]);

  return (
    <React.Fragment>
      <div>
        <h3 className="mb-3">Kênh uy tín</h3>
        <List data={users} name="featured_chanel" />
      </div>

      <div className="w-100 fanpage">
        <h3 className="mb-3 mt-4">Fanpage</h3>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnxvdesigners%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=1732530280376802"
          width="100%"
          height={130}
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder={0}
          allow="encrypted-media"
          title="fanpage"
        />
        <div className="mt-3">
          <img
            width="100%"
            src="/uploads/banners/YANNews_Banner.png"
            alt="banner"
          />
        </div>
      </div>
    </React.Fragment>
  );
}
