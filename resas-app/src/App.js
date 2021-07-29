import {useEffect, useState} from 'react';
import axios from 'axios';

import './App.css';
import Header from './components/Header';
import CheckBoxs from './components/CheckBoxs';
import Graph from './components/Graph';

function App() {
  const [checkedBoxArray, setCheckedBoxArray] = useState([]);
  const [graphData, setGraphData] = useState();

  const onChangeCheck = (e) => {
    console.log(checkedBoxArray);
    setCheckedBoxArray((prevCheckedBoxArray) => {
      let value = Number(e.target.value);
      if (prevCheckedBoxArray.includes(value)) {
        let processedArray = prevCheckedBoxArray.filter((el) => el !== value);
        return processedArray;
      } else {
        return [...prevCheckedBoxArray, Number(e.target.value)];
      }
    });
  };

  useEffect(async () => {
    setGraphData([]);
    checkedBoxArray.map((el) => {
      try {
        axios
          .get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${el}`,
            {
              headers: {
                'X-API-KEY': 'QdcBeaEZsZeDqYRyHdNIpt4iU26GTa8ERHG1tdXh',
              },
            }
          )
          .then((res) => {
            const datas = res.data.result.data[0].data;
            //console.log(datas);
            setGraphData((prevGraphData) => {
              return [
                ...prevGraphData,
                {
                  index: el,
                  datas: datas,
                },
              ];
            });
          });
      } catch (error) {
        console.log('error:', error);
      }
    });
  }, [checkedBoxArray]);

  console.log(graphData);
  return (
    <div className="App">
      <Header></Header>
      <h2>都道府県</h2>
      <CheckBoxs onChangeCheck={onChangeCheck}></CheckBoxs>
      <Graph></Graph>
      Hello World.
    </div>
  );
}

export default App;
