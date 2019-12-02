import React from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

export default function Follow() {
	const [ channels, setChannels ] = React.useState([]);
	const [ channelName, setChannelName ] = React.useState([]);
	const [ follow, setFollow ] = React.useState(0);

	React.useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/statisticals/channels");
        const { data } = res.data;

        setChannels(data);

        const channelName = [];
        const follow = [];

        const getData = property => object => {
        	if (property === "username") {
        		channelName.push(object[property]);
        	} else {
        		follow.push(object[property]);
        	}
        };

        const getChannelName = getData("username");
        const getFollow = getData("follow");

        data.forEach(getChannelName);
        data.forEach(getFollow);

        setChannelName(channelName);
        setFollow(follow);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  console.log("channels", channels);

	const data = {
		labels: channelName,
		datasets: [{
			data: follow,
			backgroundColor: ["red", "blue", "green"]
		}]
	};

	return (
		<>
			<Pie
				data={data}
				height="100px"
			/>
		</>
	)
}