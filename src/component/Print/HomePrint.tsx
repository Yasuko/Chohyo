import React from 'react';
import { Provider } from 'react-redux'
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import '../_style/app.scss';

import LoadingAnimation from '../../animation/loading.animation';
import ToastrAnimation from '../../animation/toastr.animation';

// import Components
import NewPrint from './NewPrint';

// import rootReducer from './reducers'
import { createStore } from '../../store/configureStore';

const store = createStore();

interface AppPropsInterface {
  dispatch? : any;
  page      : string;
}

export default class HomePrint
  extends React.Component <AppPropsInterface, {}>
{
  render() {
    return (
      <Provider store={ store }>
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/template" className="large_link navbar-brand">Print</Link>
          <Link to="/" className="large_link navbar-brand">Home</Link>
         </nav>
        <div className="container-fluid">
            <div className="container">
              <NewPrint />
            </div>
        </div>
        <LoadingAnimation />
        <ToastrAnimation />
      </Provider>
    )
  }

  getParam(name: string, url: string = '') {
    if (url === '') url = window.location.href;
    name = name.replace(/[[]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}
