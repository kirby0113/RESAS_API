import React from 'react';
import axios from 'axios';

import './CheckBoxs.css';

export default class CheckBoxs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefs: [],
    };
  }

  //APIから都道府県名の取得
  componentDidMount() {
    try {
      axios
        .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
          headers: {
            'X-API-KEY': 'QdcBeaEZsZeDqYRyHdNIpt4iU26GTa8ERHG1tdXh',
          },
        })
        .then((res) => {
          const prefs = res.data.result;
          console.log(prefs);
          this.setState({prefs});
        });
    } catch (error) {
      console.log('error:', error);
    }
  }
  render() {
    return (
      <div className="CheckBoxs">
        {this.state.prefs.map((pref) => (
          <div key={pref.prefName}>
            <label htmlFor={pref.prefName}>{pref.prefName}</label>
            <input
              type="checkbox"
              name="prefName"
              value={pref.prefCode}
              id={pref.prefName}
              onChange={this.props.onChangeCheck}></input>
          </div>
        ))}
      </div>
    );
  }
}
