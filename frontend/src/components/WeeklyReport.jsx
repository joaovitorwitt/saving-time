import { useEffect, useState } from "react";
// CHART JS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function WeeklyReport() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  //   console.log("WEEKLY COMPONENT RENDERED");
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.user_id) {
      fetch(
        `http://127.0.0.1:8000/api/v1/get/weekly/report/${currentUser.user_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          //   setResponseData(data.data);
          //   console.log(responseData);
        })
        .catch((error) => {
          console.log("Error fetching data: ", error);
        });
    }
  }, [currentUser]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Report",
      },
    },
  };

  const data = {
    labels: responseData.map((data) => data.day_of_week),
    datasets: [
      {
        label: "Hours",
        data: responseData.map((data) => data.total_focus_time_hours),
        backgroundColor: "rgb(101, 11, 204)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
