import React from "react";
import axios from "axios";
export default class CheckBoxs extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            prefs:[]
        }
    }
//APIから都道府県名の取得
componentDidMount(){
    try{
       axios.get(
        'https://opendata.resas-portal.go.jp/api/v1/prefectures',{ headers: {"X-API-KEY":"QdcBeaEZsZeDqYRyHdNIpt4iU26GTa8ERHG1tdXh"}}
      ).then(res => {
          const prefs = res.data.result;
          console.log(prefs);
          this.setState({prefs});
      });
    }catch(error){
      console.log("error:",error);
    }