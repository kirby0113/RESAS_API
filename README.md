# RESAS_API_Population

## 概要
このリポジトリは、RESAS（地域経済分析システム）のAPIから都道府県別の人口を取得し、グラフ化して表示するシステムです。


## 使い方

1. 以下のような画面が表示されるので、データをグラフ化したい都道府県にチェックを入れます。
![README_img-1](https://user-images.githubusercontent.com/65604109/127834285-2757938c-8c91-4636-8ad3-3b7716827b21.png)
1. チェックを入れた都道府県の人口データが、グラフに反映されて表示されます。
![README-img-2](https://user-images.githubusercontent.com/65604109/127881086-611b1749-355b-485b-9406-d4e16d01dd9b.png)

## レスポンシブデザイン
- ウィンドウサイズが一定以下の状態となった場合、以下のような画面を表示します。
![README-img-3](https://user-images.githubusercontent.com/65604109/128046895-9811300e-7872-44f2-9d86-6869dc7c1ac3.png)
- 「都道府県を選ぶ」ボタンを押すと、このようなモーダルウィンドウが表示されます。モーダルウィンドウを閉じる場合は、周りの黒背景もしくは右上上部の×印をクリックしてください。
![README-img-4](https://user-images.githubusercontent.com/65604109/128047249-09bf2bf4-daef-4f80-9ffd-2ac35afbf842.png)
- ここでチェックを入れると、同様にグラフに反映されます。
![README-img-5](https://user-images.githubusercontent.com/65604109/128047807-4e6eddec-20e8-4071-923a-a4a0f47323b0.png)

## 開発環境
### OS・コードエディタ
- Windows10
- Visual Studio Code
### フレームワーク・ライブラリ
- Node.js v14.16.0
- React v17.0.2
- chart.js v3.5.0
- react-chartjs-2 v3.0.4
- axios v0.21.1
### Linter・Prettier
- prettier v2.3.2
- eslint-config-prettier v8.3.0
- eslint-plugin-jest v24.4.0
- eslint-plugin-prettier v3.4.0
- eslint-plugin-react v7.24.0

## Reference
- [React公式ドキュメント](https://ja.reactjs.org/docs/getting-started.html)
- [Chart.js公式ドキュメント](https://www.chartjs.org/docs/latest/)
- [React(TypeScript)にreact-chartjs-2を導入し、グラフを作る方法](https://fwywd.com/tech/react-chartjs-2)
- [ReactでAxiosを使用する方法 | DigitalOcean](https://www.digitalocean.com/community/tutorials/react-axios-react-ja)
