import React from 'react';

import './CheckBoxs.css';

export default class CheckBoxs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefs: [],
    };
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
