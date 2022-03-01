import React from 'react';
import { Provider } from 'react-redux'
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';

import LoadingAnimation from '../../animation/loading.animation';
import ToastrAnimation from '../../animation/toastr.animation';

// import Component
import NewLayout from './NewLayout';

// import rootReducer from './reducers'
import { createStore } from '../../store/configureStore';

const store = createStore();
interface AppPropsInterface {
  dispatch?: any;
  page: string;
}

export default class HomeLayout
  extends React.Component <AppPropsInterface, {}>
{
  render() {
    return (
      <Provider store={ store }>
        <nav className="navbar navbar-dark bg-dark">

          <Link to="/layout" className="large_link navbar-brand">Layout</Link>
          <Link to="/" className="large_link navbar-brand">Home</Link>
        </nav>
        <div className="container-fluid">
          { this.checkPage(this.props.page) }
        </div>
        <LoadingAnimation />
        <ToastrAnimation />
      </Provider>
    )
  }

  private checkPage(page: string): any
  {
    return <NewLayout />;
  }
}
