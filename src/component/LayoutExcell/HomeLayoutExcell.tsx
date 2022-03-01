import React from 'react';
import { Provider } from 'react-redux'
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';

import LoadingAnimation from '../../animation/loading.animation';
import ToastrAnimation from '../../animation/toastr.animation';

// import Component
import NewLayoutExcell from './NewLayoutExcell';

// import rootReducer from './reducers'
import { createStore } from '../../store/configureStore';

const store = createStore();
interface AppPropsInterface {
  dispatch?: any;
  page: string;
}

export default class HomeLayoutExcell
  extends React.Component <AppPropsInterface, {}>
{
  render() {
    return (
      <Provider store={ store }>
        <nav className="navbar navbar-dark bg-dark">

          <Link to="/layout_excell" className="large_link navbar-brand">Layout</Link>
          <Link to="/" className="large_link navbar-brand">Home</Link>
        </nav>
        <div className="container-fluid">
          <NewLayoutExcell />
        </div>
        <LoadingAnimation />
        <ToastrAnimation />
      </Provider>
    )
  }
}
