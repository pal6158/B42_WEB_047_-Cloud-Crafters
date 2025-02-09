import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import 'react-toastify/ReactToastify.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
