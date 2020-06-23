import React from "react";
import axios from "axios";

export default function BestNews() {
	const [ news, setNews ] = React.useState([]);

	React.useEffect(() => {
    try {
		  const channelId = sessionStorage.getItem("userId");
      const fetchData = async () => {
        const res = await axios.get("/statisticals/channels/bestNews", { params: { channelId: channelId } });

        setNews(res.data.data);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  console.log('data', news);

	return (
		<>
			<table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">Stt</th>
            <th scope="col">Tên</th>
          </tr>
        </thead>
        <tbody>
        	{
        		news
        		? (
        			news.map((item, index) => (
        				<tr key={index}>
			            <th scope="row">{++index}</th>
			            <td>{item.title}</td>
			          </tr>
        			))
        		)
        		: null
        	}
        </tbody>
      </table>	
		</>
	)
}