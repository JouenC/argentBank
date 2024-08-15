// react
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

// pages and components
import store from "./app/store";
import Header from './components/Header'
import Home from './pages/Home'

// style
import '../src/style/main.css'

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <Header />
        <Routes>
            <Route index element={<Home />} />
        </Routes>
      </Provider>  
    </BrowserRouter>
  )
};
