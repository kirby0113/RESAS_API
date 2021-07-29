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
      let value = e.target.value;
      if (prevCheckedBoxArray.includes(value)) {
        let processedArray = prevCheckedBoxArray.filter((el) => el !== value);
        return processedArray;
      } else {
        return [...prevCheckedBoxArray, e.target.value];
      }
    });
  };

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
