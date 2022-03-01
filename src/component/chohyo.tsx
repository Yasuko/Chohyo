import React from 'react';
import { Provider } from 'react-redux'
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';

// import rootReducer from './reducers'
import { createStore } from '../store/configureStore';

const store = createStore();
interface AppPropsInterface {
  dispatch?: any;
}

export default class ChoHyo
  extends React.Component <AppPropsInterface, {}>
{
  render() {
    return (
      <Provider store={ store }>
        <div>
          <h3>ChoHyo Maker</h3>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="jumbotron"
                style={{width: '30rem', border: 'solid 1px gray', padding: '20px', margin: '10px', borderRadius: '10px'}}>
                <h1 className="display-4">Layout (svg)</h1>
                <p className="lead">レイアウト作成・出力</p>
                <hr className="my-4" />
                <p>SVGレイアウトの作成、印刷</p>
                <Link to="/layout" className="btn btn-primary btn-lg">Start</Link>
              </div>
            </div>
            <div className="col">
              <div className="jumbotron"
                style={{width: '30rem', border: 'solid 1px gray', padding: '20px', margin: '10px', borderRadius: '10px'}}>
                <h1 className="display-4">Layout (excell)</h1>
                <p className="lead">レイアウト作成・出力</p>
                <hr className="my-4" />
                <p>Excellレイアウトの作成、印刷</p>
                <Link to="/layout_excell" className="btn btn-primary btn-lg">Start</Link>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    )
  }
}
// render (
//    <App />,
//    document.getElementById('regist')
//);