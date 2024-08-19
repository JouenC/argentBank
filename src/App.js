// react
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

// store
import store from "./app/store";

// pages
import Home from './pages/Home';
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Customer from "./pages/Customer";

// components
import Header from './components/header/Header';
import SafeRoute from "./utils/safeRoute/SafeRoute";
import Footer from "./components/footer/Footer";

// style
import '../src/style/main.css';


export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <Header />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <SafeRoute>
                  <div><Customer /></div>
                </SafeRoute>
              } />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Provider>  
    </BrowserRouter>
  )
};