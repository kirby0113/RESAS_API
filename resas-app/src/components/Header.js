/*
ヘッダー用のコンポーネントです。
今回はタイトルのみ表示しています。
*/

import './Header.css';

const Header = () => {
  return (
    <div className='Header'>
      <span className='HeaderTitle'>RESAS_API_Population</span>
    </div>
  );
};

export default Header;
