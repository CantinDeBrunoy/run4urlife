import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/index.scss';
import App from './app.router';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root'),
);
