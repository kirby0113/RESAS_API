import {useEffect, useState} from 'react';

import {Line} from 'react-chartjs-2';

function Graph(props) {
  const [graphState, setGraphState] = useState();
  useEffect(() => {
    let datasets = props.graphDatas.map((graphData) => {
      console.log(graphData);
      const validdata = graphData.data
        .map((data) => {
          if (data.year >= 1995 && data.year <= 2020) {
            return data.value;
          } else {
            return;
          }
        })
        .filter((data) => data);

      return {
        label: graphData.key,
        fill: false,
        lineTension: 0.1,
        backgroundColor: graphData.color,
        borderColor: graphData.color,
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'square',
        pointBorderColor: 'rgba(255,0,0)',
        pointBackgroundColor: '#eee',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,255,0)', //各ポイントにカーソルが当たった時のポイントの背景色
        pointHoverBorderColor: 'rgba(0,0,255)', //各ポイントにカーソルが当たった時のポインタのボーダー色
        pointHoverBoderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: validdata,
      };
    });
    const data = {
      labels: ['1995年', '2000年', '2005年', '2010年', '2015年', '2020年'],
      datasets: datasets,
    };
    console.log(data);
    setGraphState(data);
  }, [props.graphDatas]);

  return (
    <div>
      <h2>各都道府県の人口推移</h2>
      <Line data={graphState} height={70} />
    </div>
  );
}

export default Graph;
