// react
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

// pages and components
import store from "./app/store";
import Header from './components/Header';
import Home from './pages/Home';
import Login from "./pages/Login";
import SafeRoute from "./utils/safeRoute/SafeRoute";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";

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
                  <div>"Youpi!"</div>
                </SafeRoute>
              } />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Provider>  
    </BrowserRouter>
  )
};