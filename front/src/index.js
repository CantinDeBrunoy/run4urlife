import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/index.scss';
import App from './app.router';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root'),
);
