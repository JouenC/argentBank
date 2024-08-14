// react
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// pages and components
import Header from './components/Header'
import Home from './pages/Home'

// style
import '../src/style/main.css'

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
          <Routes>
              <Route index element={<Home />} />
          </Routes>
    </BrowserRouter>
  )
};
