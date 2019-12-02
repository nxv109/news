import React from "react";
import axios from "axios";
import moment from "moment";
import { Bar } from "react-chartjs-2";

export default function ViewsTotal(props) {
	const [ news, setNews ] = React.useState([]);

	const monthDefault = moment().format("YYYY-MM-DD");
	const getMonth = props.month || monthDefault;

	React.useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/statisticals/viewsOfMonth", { params: { month: getMonth } });

        setNews(res.data.data);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [getMonth]);

  const labels = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  let rs = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

  // dem luot views cua tung tin tuc
  const countView = news.reduce((a, b) => {
    a[b['news']] = (++a[b['news']]) || 1;
    return a;
  }, {});

  const convertToArray = Object.entries(countView);

  let arr = [];
  news.map(v => {
    convertToArray.forEach(([key, value]) => {
      if (v.news === key) {
        arr.push({...v, views: value})
      }
    })

    return arr;
  });

  const arr0 = [];
  arr.map(v => {
  	arr0.push({ date: moment(v.date).utc().format("YYYY-MM-DD"), views: v.views });

  	return arr0;
  });

  // lấy tổng views theo thời gian
  const arr1 = arr0.reduce((prev, next) => {
    prev[next.date] = prev[next.date] + 1 > 1 ? prev[next.date] + next.views : next.views;

    return prev;
  }, {});

  let rs1 = [];

  for (let key in arr1) {
    rs1.push({date: key, views: arr1[key]});
  }

  // set views theo ngay
  rs1.map(v => {
    const date = moment(v.date).format("DD");

    if (labels.includes(date)) {
      rs.splice(labels.indexOf(date), 0, v.views);
    }

    return rs;
  });

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Views",
				data: rs,
				backgroundColor: [
				'rgba(255, 99, 132, 0.6)',
				'rgba(255, 99, 133, 0.6)'
				]
			}
		]
	}
	return (
		<>
			<Bar
				data={data}
        height={300}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
			/>
		</>
	)
}