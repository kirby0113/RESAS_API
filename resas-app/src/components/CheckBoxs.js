import React from "react";
import axios from "axios";
export default class CheckBoxs extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            prefs:[]
        }
    }