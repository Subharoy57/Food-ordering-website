import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client' instead of 'react-dom'
import App from './App'; // Correct the import path for App component
import './index.css'; // Import index.css

import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext';

createRoot(document.getElementById('root')).render( // Use createRoot instead of ReactDOM.createRoot
  <BrowserRouter>   
  <StoreContextProvider>  
    <App />       
    </StoreContextProvider>      
  </BrowserRouter>
);

