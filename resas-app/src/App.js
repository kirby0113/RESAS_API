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
  const [isLoaded,setIsLoaded] = useState(false);
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
          const prefs = res.data.result.map((pref) => {
            return {
            prefName:pref.prefName,
            prefCode:pref.prefCode,
            color:`rgba(${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255
            )},${Math.floor(Math.random() * 255)})`
            }
          });
          console.log(prefs);
          setPrefs(prefs);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }, []);

  const onChangeCheck = (e) => {
    setCheckedBoxArray((prevCheckedBoxArray) => {
      let value = Number(e.target.value);
      if (prevCheckedBoxArray.includes(value)) {
        let processedArray = prevCheckedBoxArray.filter((el) => el !== value);
        //console.log(processedArray);
        return [...processedArray];
      } else {
        //console.log([...prevCheckedBoxArray,Number(e.target.value)]);
        return [...prevCheckedBoxArray, Number(e.target.value)];
      }
    });
  };

  //チェックされている都道府県の人口データをAPIから取得
  useEffect(() => {
    let datas = [];
    setGraphDatas([]);
    setIsLoaded(false);
    try {
      checkedBoxArray.map(async (el) => {
        let data = await axios
          .get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${el}`,
            {
              headers: {
                'X-API-KEY': 'QdcBeaEZsZeDqYRyHdNIpt4iU26GTa8ERHG1tdXh',
              },
            }
          )
          .then((response) => response.data.result.data[0].data);
        datas = [
          ...datas,
          {
            key: prefs[el - 1].prefName,
            color:prefs[el - 1].color,
            data: data,
          },
        ];
        console.log('datas:', datas);

        setGraphDatas(datas);
      });
    } catch (error) {
      console.log('error:', error);
    }
  }, [checkedBoxArray]);

  //グラフのデータが読み込めた時にグラフを表示する
  useEffect(() => {
    if(graphDatas.length === checkedBoxArray.length){ 
      setIsLoaded(true);
      }
  },[graphDatas])

  return (
    <div className="App">
      <Header></Header>
      <h2>都道府県</h2>
      <CheckBoxs onChangeCheck={onChangeCheck} prefs={prefs}></CheckBoxs>
      <Graph graphDatas={graphDatas} isLoaded={isLoaded}></Graph>
      Hello World.
    </div>
  );
}

export default App;
