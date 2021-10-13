import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

function Chart({ UserId }) {
  const [Labels, setLabels] = useState([]);
  const [Color, setColor] = useState([]);

  useEffect(() => {
    // Theme name, Color 가져오기
    axios.get(`https://localhost:5000/allTheme/${UserId}`).then((res) => {
      console.log(res.data.allTheme);

      let newLabels = [];
      let newColors = [];

      for (let i = 0; i < res.data.allTheme.length; i++) {
        newLabels.push(res.data.allTheme[i].name);
        newColors.push(res.data.allTheme[i].color);
      }
      setLabels(newLabels);
      setColor(newColors);
    });

    // Calculate 시간 가져오기
  }, []);

  const data = {
    labels: Labels,
    datasets: [
      {
        data: [12, 3, 4, 5, 6, 7, 3],
        backgroundColor: Color,
        hoverBackgroundColor: Color,
      },
    ],
  };
  return (
    <div>
      <h2>Pie Example</h2>
      <Pie data={data} />
    </div>
  );
}
export default Chart;
