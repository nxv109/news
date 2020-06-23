import React from "react";
import axios from "axios";

export default function Follow() {
	const [ channels, setChannels ] = React.useState({});

  const channelId = sessionStorage.getItem("userId");

	React.useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/statisticals/channels/follows", { params: { channelId: channelId } });
        const { data } = res.data;

        setChannels(data[0]);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [channelId]);

	return (
		<>
      <span className="badge badge-danger ml-1">{channels.follow}</span>
		</>
	)
}