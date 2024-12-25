import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Crud from './testComponent/Crud.jsx';
import Test from './testComponent/Test.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <Crud/> */}
  <Test/>
  </React.StrictMode>

  
);
reportWebVitals();
