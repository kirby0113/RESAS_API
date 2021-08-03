/*
グラフを表示するためのコンポーネントです。
APIから取得した各都道府県の人口データをもとに、グラフ作成に必要なデータを作りグラフ化します。
*/

import {useEffect, useState} from 'react';

import {Line} from 'react-chartjs-2';

import './Graph.css';

const Graph = (props) => {
  const [graphState, setGraphState] = useState();

  useEffect(() => {

    //必要な数だけグラフデータを作成し、datasetsとする
    let datasets = props.graphDatas.map((graphData) => {

      //1995年から2020年までのデータのみ抽出する
      const validdata = graphData.data
        .map((data) => {
          if (data.year >= 1995 && data.year <= 2020) {
            return data.value;
          } else {
            return;
          }
        })
        .filter((data) => data);
        
      //抽出したデータをもとに、必要な数のdatasetsを作成
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

    //APIからデータを取得していないときは空のグラフを生成する
    if (datasets.length === 0) {
      datasets = [
        {
          label: '',
          data: [],
        },
      ];
    }

    //作成したグラフデータをgraphStateセット
    const data = {
      labels: ['1995年', '2000年', '2005年', '2010年', '2015年', '2020年'],
      datasets: datasets,
    };
    setGraphState(data);

  }, [props.graphDatas]);

  //表示する折れ線グラフとラベルをまとめてlineGraphとしています
  const lineGraph = (
    <div className='graph-container'>
      <Line
        data={graphState}
        options={{
          maintainAspectRatio: false,
        }}
      />
      <span className='y-label'>人口数</span>
      <span className='x-label'>年</span>
    </div>
  );

  return (
    <div>
      <h2 className='graph-heading'>各都道府県の人口推移</h2>
      {props.isLoaded ? lineGraph : <h2>NowLoading...</h2>}
    </div>
  );
};

export default Graph;
