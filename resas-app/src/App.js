import {useEffect, useState, useRef} from 'react';
import axios from 'axios';

import './App.css';
import Header from './components/Header';
import CheckBoxs from './components/CheckBoxs';
import Graph from './components/Graph';

const API_KEY = 'QdcBeaEZsZeDqYRyHdNIpt4iU26GTa8ERHG1tdXh';

const App = () => {
  const [prefs, setPrefs] = useState([]); //APIから取得した都道府県を保存
  const [checkedBoxArray, setCheckedBoxArray] = useState([]); //チェックボックスのチェック状態を保存
  const [graphDatas, setGraphDatas] = useState([]); //APIから取得したグラフ用のデータを保存
  const [isLoaded, setIsLoaded] = useState(false); //APIからグラフ用のデータを取得し終わったかを保存
  const [windowDimentions, setWindowDimentions] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  }); //現在のウィンドウサイズを保存
  const [modalState, setModalState] = useState(false); //モーダル要素が表示されているかを保存（一定未満のサイズの時、チェックボックスをモーダル要素にしています）

  const dimentionsRef = useRef(null); //useRefを使用して、最新の状態のウィンドウサイズを取得
  dimentionsRef.current = windowDimentions;

  useEffect(() => {
    //ウィンドウサイズが変更された場合に、最新のウィンドウサイズを保存
    window.addEventListener('resize', () => {
      setWindowDimentions({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    });
  }, []);

  //APIから都道府県名の取得
  useEffect(() => {
    try {
      axios
        .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
          headers: {
            'X-API-KEY': API_KEY,
          },
        })
        .then((res) => {
          const prefs = res.data.result.map((pref) => {
            return {
              prefName: pref.prefName,
              prefCode: pref.prefCode,
              color: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(
                Math.random() * 255
              )})`,
            };
          });
          setPrefs(prefs);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }, []);

  //チェックボックスのチェック状態を保存
  const onChangeCheck = (e) => {
    setCheckedBoxArray((prevCheckedBoxArray) => {
      let value = Number(e.target.value);
      if (prevCheckedBoxArray.includes(value)) {
        let processedArray = prevCheckedBoxArray.filter((el) => el !== value);
        return [...processedArray];
      } else {
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
          .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${el}`, {
            headers: {
              'X-API-KEY': API_KEY,
            },
          })
          .then((response) => response.data.result.data[0].data);
        datas = [
          ...datas,
          {
            key: prefs[el - 1].prefName,
            color: prefs[el - 1].color,
            data: data,
          },
        ];
        setGraphDatas(datas);
      });
    } catch (error) {
      console.log('error:', error);
    }
  }, [checkedBoxArray]);

  //グラフのデータが読み込めた時にグラフを表示する
  useEffect(() => {
    if (graphDatas.length === checkedBoxArray.length) {
      setIsLoaded(true);
    }
  }, [graphDatas]);

  return (
    <div className='App'>
      {dimentionsRef.current.y > 650 && dimentionsRef.current.x > 760 ? (
        ''
      ) : (
        <div
          className={'overray' + ' ' + (modalState ? 'overrayActive' : '')}
          onClick={() => {
            setModalState(false);
          }}
        >&nbsp;</div>
      )}
      {dimentionsRef.current.y > 650 && dimentionsRef.current.x > 760 ? (
        ''
      ) : (
        <div
          className={'closeButton' + ' ' + (modalState ? 'closeButtonActive' : '')}
          onClick={() => {
            setModalState(false);
          }}
        >
          &#935;
        </div>
      )}
      <Header></Header>
      {dimentionsRef.current.y > 650 && dimentionsRef.current.x > 760 ? (
        <h2>都道府県</h2>
      ) : (
        <div
          className='openModalButton'
          onClick={() => {
            setModalState(true);
          }}
        >
          都道府県を選ぶ
        </div>
      )}
      <CheckBoxs onChangeCheck={onChangeCheck} prefs={prefs} modalState={modalState}></CheckBoxs>
      <Graph graphDatas={graphDatas} isLoaded={isLoaded}></Graph>
    </div>
  );
};

export default App;
