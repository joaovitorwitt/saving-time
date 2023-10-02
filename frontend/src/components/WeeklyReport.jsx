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

  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const [responseData, setResponseData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.user_id && !hasFetchedData) {
      fetch(
        `http://127.0.0.1:8000/api/v1/get/weekly/report/${currentUser.user_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            setResponseData(data.data);
            setHasFetchedData(true);
            console.log(responseData);
          }
        })
        .catch((error) => {
          console.log("Error fetching data: ", error);
        });
    }
  }, [currentUser, hasFetchedData]);

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
    labels: responseData.map((data) => data.day_of_the_week),
    datasets: [
      {
        label: "Hours",
        data: responseData.map((data) => data.focus_time),
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
