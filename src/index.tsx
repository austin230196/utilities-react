import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "styled-components";
import 'react-toastify/dist/ReactToastify.css';





import './index.css';
import App from './App';
import {theme} from "./theme";
import ChatContextProvider from './contexts/Chat';
import reportWebVitals from './reportWebVitals';



const root = createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
     />
    <Router>
      <ThemeProvider theme={theme}>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
