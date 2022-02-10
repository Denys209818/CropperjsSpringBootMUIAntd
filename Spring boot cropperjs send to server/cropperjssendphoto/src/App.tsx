import React, {Suspense} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminLayout from './containers/AdminLayout';
import DefaultLayout from './containers/DefaultLayout';
import { AdminRoutes } from './routes/AdminRoutes';
import { DefaultRoutes } from './routes/DefaultRoutes';

const App = () => {
  return (
   <>
   <Suspense fallback={<>Загрузка...</>}>
   <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminLayout/>}>
            {AdminRoutes.map((element, index) => {
              return (
                <Route key={index} path={element.path} element={<element.element/>}/>
              );
            })}
        </Route>
        <Route path='/' element={<DefaultLayout/>}>
            {DefaultRoutes.map((element, index) => {
              return (
                <Route key={index} path={element.path} element={<element.element/>}/>
              );
            })}
        </Route>
      </Routes>
   </BrowserRouter>
   </Suspense>
   </>
  );
}

export default App;
