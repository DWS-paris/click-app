// [APP] Entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add component to define FLUX
import { Provider } from 'react-redux';
import store from "./store"

// Add compoenent to define routes
import { BrowserRouter } from "react-router-dom"

// Define App
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render APP
root.render(
  <React.StrictMode>
    {/* Inject APP store with Provider */}
    <Provider store={ store }>
      {/* Inject BrowserRouter module */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
