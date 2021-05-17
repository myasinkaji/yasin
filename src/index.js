import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, MuiThemeProvider, Paper} from "@material-ui/core";
import {BrowserRouter as Router} from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <MuiThemeProvider theme={theme}>
                <Paper square>
                    <App/>
                </Paper>
            </MuiThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
