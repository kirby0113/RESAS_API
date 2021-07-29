import {Line} from 'react-chartjs-2';

const data = {
  labels: ['1995年', '2000年', '2005年', '2010年', '2015年', '2020年'],
  datasets: [
    {
      label: 'Test Graph',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(0,0,0)',
      borderColor: 'rgba(0,0,0)',
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
      data: [1, 10, 100, 50, 60, 80],
    },
  ],
};

function Graph() {
  return (
    <div>
      <h2>Test Graph</h2>
      <Line data={data} height={100} />
    </div>
  );
}

export default Graph;
