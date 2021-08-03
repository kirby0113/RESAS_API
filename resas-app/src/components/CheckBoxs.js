import './CheckBoxs.css';

const CheckBoxs = (props) => {
  return (
    <div className={'CheckBoxs' + ' ' + (props.modalState ? 'modalActive' : '')}>
      {props.prefs.map((pref) => (
        <div key={pref.prefName}>
          <label htmlFor={pref.prefName}>{pref.prefName}</label>
          <input
            type='checkbox'
            className='checkbox'
            name='prefName'
            value={pref.prefCode}
            id={pref.prefName}
            onChange={props.onChangeCheck}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckBoxs;
