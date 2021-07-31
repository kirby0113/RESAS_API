import './CheckBoxs.css';

const CheckBoxs = (props) => {
  return (
    <div className="CheckBoxs">
      {props.prefs.map((pref) => (
        <div key={pref.prefName}>
          <label htmlFor={pref.prefName}>{pref.prefName}</label>
          <input
            type="checkbox"
            name="prefName"
            value={pref.prefCode}
            id={pref.prefName}
            onChange={props.onChangeCheck}></input>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxs;
