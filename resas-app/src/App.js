import {useEffect, useState} from 'react';
import axios from 'axios';

import './App.css';
import Header from './components/Header';
import CheckBoxs from './components/CheckBoxs';
import Graph from './components/Graph';

function App() {
  const [prefs, setPrefs] = useState([]);
  const [checkedBoxArray, setCheckedBoxArray] = useState([]);
  const [graphDatas, setGraphDatas] = useState([]);

    //APIから都道府県名の取得
    useEffect(() => {
      try {
        axios
          .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
            headers: {
              'X-API-KEY': 'QdcBeaEZsZeDqYRyHdNIpt4iU26GTa8ERHG1tdXh',
            },
          })
          .then((res) => {
            const prefs = res.data.result;
            setPrefs(prefs);
          });
      } catch (error) {
        console.log('error:', error);
      }
    },[]);

    const onChangeCheck = (e) => {
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

  //チェックされている都道府県の人口データをAPIから取得
  useEffect(() => {
    let datas = [];
    checkedBoxArray.map(async (el) => {
      try {
        const data = await axios
          .get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${el}`,
            {
              headers: {
                'X-API-KEY': 'QdcBeaEZsZeDqYRyHdNIpt4iU26GTa8ERHG1tdXh',
              },
            }
          ).then((response) => response.data.result.data[0].data);
          datas.push({
            key:el,
            data:data
          });
      } catch (error) {
        console.log('error:', error);
      }

    });
    setGraphData(datas);
  }, [checkedBoxArray]);


  return (
    <div className="App">
      <Header></Header>
      <h2>都道府県</h2>
      <CheckBoxs onChangeCheck={onChangeCheck} prefs={prefs}></CheckBoxs>
      <Graph graphDatas={graphDatas}></Graph>
      Hello World.
    </div>
  );
}

export default App;
