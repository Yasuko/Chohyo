import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import component
import ChoHyo from './component/chohyo';
import HomeLayout from './component/Layout/HomeLayout';
import HomeLayoutExcell from './component/LayoutExcell/HomeLayoutExcell';
import HomePrint from './component/Print/HomePrint';

require('./bootstrap');

render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={ <ChoHyo /> }></Route>
        <Route path="/layout" element={ <HomeLayout page="" /> }></Route>
        <Route path="/layout/new" element={ <HomeLayout page="new" /> }></Route>
        <Route path="/layout/edit" element={ <HomeLayout page="edit" /> }></Route>
        <Route path="/layout_excell" element={ <HomeLayoutExcell page="" /> }></Route>
        <Route path="/layout_excell/new" element={ <HomeLayoutExcell page="new" /> }></Route>
        <Route path="/print/new" element={ <HomePrint page="new" /> }></Route>
    </Routes>
  </BrowserRouter>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

