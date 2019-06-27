import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';


function initApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

if (window.appName){
  initApp();
} else {
  window.onJsBridgeLoad = initApp;
}

// initApp();

