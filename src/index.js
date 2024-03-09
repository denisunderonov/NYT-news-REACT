import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import Header from './components/header/header';
import Main from './components/main/main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <Main />
  </>
);
