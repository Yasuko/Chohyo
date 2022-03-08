# PDF帳票、エクセル帳票作成支援 #


### 概要

* SVGテンプレートを使用したPDF帳票の作成
    * レイアウト編集
    * CSVから文字列の埋め込み
* Excellテンプレートを使用したExcell帳票の作成
    * CSVから文字列の埋め込み
* [稼働サンプル](https://chohyo.yasukosan.net)

### 環境 ###

* nodejs 14.16.1 (開発環境)
* src/_libに[Lib](https://bitbucket.org/uzaking/typescript_lib/admin)をsubmoduleで追加

### ビルド ###
* npm install       // nodemodule追加
* npm build --prod  // リリースビルド作成
* npm start         // 開発用ビルド


# 出力 ###

## SVG

■１　Layout(svg)を選択
<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149235-917a421c-fb2f-4653-8e22-cd9e49e1e283.png" width="50%">
</div>

<br></br>
■２　SVGレイアウトをドラッグ
<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149430-3136388c-75c0-4357-88e8-4bf3500f90ed.png" width="80%">
</div>


※「svg」ディレクトリ無いにサンプルあり
「SVGをドラッグ」にsvgファイルをドラッグし
用紙サイズ、印刷向きを選択

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149670-2a083a48-2b6c-4cfe-8033-bf57ae00e328.png" width="80%">
</div>


表示されたレイアウトは編集エリア内で
・マウスドラッグで移動
・マウススクロールで拡大縮小
が行える

<br></br>

■３ 文字追加
<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149729-c2479292-6287-478e-8a45-66d9f4109162.png" width="50%">
</div>
「ADD」を選択

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149733-be8d9ddd-aafa-4ec2-9125-af6079bc2d41.png" width="50%">
</div>

編集エリアにテキストが追加される
テキストはドラッグ移動可能

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149735-899d6609-6934-4e20-8a11-a010d61fb4ab.png" width="50%">
</div>

テキスト選択時に右側にテキスト編集画面が表示される

|項|説明|
|---|---|
| Text | 表示される文字列 |
| Name | CSV置換を使用する場合の変数名 |
| Font | フォントを指定（ローカルフォントを使用するため選択肢と出力が一致しない場合あり）|
| Size | ピクセル単位で指定 |
| X | x座標 |
| Y | y座標 |

<br></br>

■４ 画像追加
<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149739-ba962e01-eee3-4d3d-9335-2790f7fc06d6.png" width="50%">
</div>
「画像をドラッグ」に画像をドラッグ

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157149742-31c05470-600f-472a-bac2-079cd588266e.png" width="50%">
</div>
編集エリアに表示された画像は

* ドラッグで移動
* 右下の四角でリサイズ

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157152682-17579270-efeb-43b8-99e0-2d5d38d97c48.png" width="50%">
</div>


<br></br>

■５　PDF出力

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157152687-66504fb5-a146-410b-9241-180b11154c4e.png" width="50%">
</div>
右上の「PDF作成」を選択

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157152690-92dde5e8-2bf4-48df-9402-7cf79779b33f.png" width="50%">
</div>
「宇宙パワー.pdf」がダウンロードされる

<div align="center">
<img src="https://user-images.githubusercontent.com/1531028/157152692-951e672b-17ae-4b30-8065-212445024d3d.png" width="50%">
</div>
レイアウト通りのPDFが出てくる
