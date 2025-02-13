import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("IFB-7hW3WtBavmbeV");

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
