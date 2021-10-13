import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

const BarChart = ( {userId, ToDoList }) => {

  // userId로 테마명을 리스트를 배열에 담기 : labels
  // 테마명에 해당하는 색깔을 배열에 담기 : borderColor + 연하게 해서 배열에 담기 : backgroundColor
  // 테마명에 해당하는 시간 합계를 배열에 담기 : data

  const [labels, setLabels] = useState([]);
  const [borderColor, setBorderColor] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [timeData, setTimeData] = useState([]);

//   useEffect(() => {
//     // Theme name, Color 가져오기
//     axios.get(`https://localhost:5000/allTheme/${userId}`).then((res) => {
//       console.log(res.data.allTheme);

//       let newLabels = [];
//       let newBorderColors = [];
//       let newBackgroundColors = [];
//       let newTimeDatas = []

//       for (let i = 0; i < res.data.allTheme.length; i++) {
//         let themeName = res.data.allTheme[i].name
//         let themeColor = res.data.allTheme[i].color
//         let lightColor = themeColor[0]+'33'+themeColor.slice(1,7)
//         newLabels.push(themeName);
//         newBorderColors.push(themeColor);
//         newBackgroundColors.push(lightColor)

//         axios.get('https://localhost:5000/time', { params: { userId: userId, theme: themeName } },
//         { withCredentials: true })
//         .then((res)=>{
//             console.log(res)
//             newTimeDatas.push(res)
//         })
//         .catch((err)=> {
//             console.log(err)
//         })

//       }
//       setLabels(newLabels);
//       setBorderColor(newBorderColors);
//       setBackgroundColor(newBackgroundColors)
//       setTimeData(newTimeDatas)
//     })

//     // Calculate 시간 가져오기
//   }, [ToDoList]);

  

return (
	<div>
        <Bar
          data={{
              labels: labels,
              datasets: [{
                label: 'Planned',
                data: [2, 3, 1, 4, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1    
              }, 
              {
                label: 'Feedback',
                data: timeData,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1    
              }]
          }}
          height={400}
          weight={600} 
          options={{
              maintainAspectRatio: false
          }}
          />
    </div>
)

}

export default BarChart